import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import type { UserRole } from "./types";

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "scopusixteen-dev-secret-change-in-production"
);

const COOKIE_NAME = "sx_session";

export interface SessionUser {
  id: string;
  email: string;
  name?: string;
  roles: UserRole[];
}

export async function createSession(user: SessionUser): Promise<string> {
  const token = await new SignJWT({
    id: user.id,
    email: user.email,
    name: user.name,
    roles: user.roles,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(SECRET);

  return token;
}

export async function verifySession(
  token: string
): Promise<SessionUser | null> {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return {
      id: payload.id as string,
      email: payload.email as string,
      name: payload.name as string | undefined,
      roles: (payload.roles as UserRole[]) || [],
    };
  } catch {
    return null;
  }
}

export async function getSession(): Promise<SessionUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
  return verifySession(token);
}

export async function setSessionCookie(token: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export function hasRole(user: SessionUser | null, role: UserRole): boolean {
  return !!user?.roles.includes(role);
}

export function hasAnyRole(
  user: SessionUser | null,
  roles: UserRole[]
): boolean {
  return !!user?.roles.some((r) => roles.includes(r));
}
