import { NextRequest } from "next/server";

/**
 * Institutional IP-range access (subscription mode for campus networks).
 * Configure INSTITUTIONAL_IP_RANGES as JSON, e.g.:
 * [{"name":"Demo University","cidrs":["127.0.0.1/32","10.0.0.0/8"],"journalIds":["*"]}]
 */

export interface IpRangeConfig {
  name: string;
  cidrs: string[];
  journalIds: string[]; // "*" = all
}

function parseRanges(): IpRangeConfig[] {
  try {
    const raw = process.env.INSTITUTIONAL_IP_RANGES;
    if (!raw) {
      // Localhost demo range so dev machines can test
      if (process.env.NODE_ENV !== "production") {
        return [
          {
            name: "Local development",
            cidrs: ["127.0.0.1/32", "::1/128"],
            journalIds: ["*"],
          },
        ];
      }
      return [];
    }
    return JSON.parse(raw) as IpRangeConfig[];
  } catch {
    return [];
  }
}

/** Minimal IPv4 match for /8 /16 /24 /32 */
function ipv4InCidr(ip: string, cidr: string): boolean {
  const [base, bitsStr] = cidr.split("/");
  const bits = parseInt(bitsStr || "32", 10);
  const ipParts = ip.split(".").map(Number);
  const baseParts = base.split(".").map(Number);
  if (ipParts.length !== 4 || baseParts.length !== 4) return false;
  const ipNum =
    ((ipParts[0] << 24) >>> 0) +
    (ipParts[1] << 16) +
    (ipParts[2] << 8) +
    ipParts[3];
  const baseNum =
    ((baseParts[0] << 24) >>> 0) +
    (baseParts[1] << 16) +
    (baseParts[2] << 8) +
    baseParts[3];
  const mask = bits === 0 ? 0 : (~0 << (32 - bits)) >>> 0;
  return (ipNum & mask) === (baseNum & mask);
}

export function clientIp(req: NextRequest): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "127.0.0.1";
}

export function institutionalAccessForIp(
  ip: string,
  journalId: string
): { allowed: boolean; institution?: string } {
  const ranges = parseRanges();
  for (const r of ranges) {
    const ipMatch = r.cidrs.some((c) => {
      if (c.includes(":")) {
        // naive IPv6: only exact ::1
        return ip === "::1" && (c === "::1/128" || c === "::1");
      }
      return ipv4InCidr(ip, c);
    });
    if (!ipMatch) continue;
    const journalOk =
      r.journalIds.includes("*") || r.journalIds.includes(journalId);
    if (journalOk) {
      return { allowed: true, institution: r.name };
    }
  }
  return { allowed: false };
}
