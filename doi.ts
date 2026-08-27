/**
 * DOI / Crossref registration helper.
 * Production uses Crossref REST API with membership credentials.
 * https://www.crossref.org/documentation/registering-content/
 */

export interface DoiDepositInput {
  manuscriptId: string;
  title: string;
  authors: { given?: string; family: string; orcid?: string }[];
  abstract?: string;
  journalTitle: string;
  issn?: string;
  publicationYear: number;
  volume?: string;
  issue?: string;
  /** Full URL of the published article on your site */
  resourceUrl: string;
}

/** Build a deterministic demo DOI under a placeholder prefix */
export function mintDemoDoi(manuscriptId: string): string {
  const prefix = process.env.DOI_PREFIX || "10.5678";
  const suffix = manuscriptId.replace(/[^a-zA-Z0-9]/g, "").slice(0, 12) || "demo";
  return `${prefix}/sx.${suffix}`.toLowerCase();
}

/**
 * Register (or simulate) a DOI with Crossref.
 * Requires CROSSREF_USERNAME, CROSSREF_PASSWORD (or token), DOI_PREFIX.
 */
export async function registerDoi(
  input: DoiDepositInput
): Promise<{ doi: string; demo?: boolean; status: string; raw?: unknown }> {
  const doi = mintDemoDoi(input.manuscriptId);

  const user = process.env.CROSSREF_USERNAME;
  const pass = process.env.CROSSREF_PASSWORD;

  if (!user || !pass) {
    console.log("[doi:demo] Would register", doi, input.title);
    return {
      doi,
      demo: true,
      status: "demo-registered",
    };
  }

  // Minimal Crossref deposit XML (simplified – expand for production)
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<doi_batch version="4.4.2" xmlns="http://www.crossref.org/schema/4.4.2"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.crossref.org/schema/4.4.2 https://www.crossref.org/schemas/crossref4.4.2.xsd">
  <head>
    <doi_batch_id>${input.manuscriptId}-${Date.now()}</doi_batch_id>
    <timestamp>${Date.now()}</timestamp>
    <depositor>
      <depositor_name>Scopusixteen</depositor_name>
      <email_address>${process.env.CROSSREF_DEPOSITOR_EMAIL || "doi@scopusixteen.com"}</email_address>
    </depositor>
    <registrant>Scopusixteen Publishing</registrant>
  </head>
  <body>
    <journal>
      <journal_metadata>
        <full_title>${escapeXml(input.journalTitle)}</full_title>
        ${input.issn ? `<issn media_type="electronic">${escapeXml(input.issn)}</issn>` : ""}
      </journal_metadata>
      <journal_issue>
        <publication_date media_type="online">
          <year>${input.publicationYear}</year>
        </publication_date>
        ${input.volume ? `<journal_volume><volume>${escapeXml(input.volume)}</volume></journal_volume>` : ""}
        ${input.issue ? `<issue>${escapeXml(input.issue)}</issue>` : ""}
      </journal_issue>
      <journal_article publication_type="full_text">
        <titles><title>${escapeXml(input.title)}</title></titles>
        <contributors>
          ${input.authors
            .map(
              (a, i) => `
          <person_name sequence="${i === 0 ? "first" : "additional"}" contributor_role="author">
            ${a.given ? `<given_name>${escapeXml(a.given)}</given_name>` : ""}
            <surname>${escapeXml(a.family)}</surname>
            ${a.orcid ? `<ORCID>${escapeXml(a.orcid)}</ORCID>` : ""}
          </person_name>`
            )
            .join("")}
        </contributors>
        <doi_data>
          <doi>${doi}</doi>
          <resource>${escapeXml(input.resourceUrl)}</resource>
        </doi_data>
      </journal_article>
    </journal>
  </body>
</doi_batch>`;

  try {
    const auth = Buffer.from(`${user}:${pass}`).toString("base64");
    const res = await fetch("https://doi.crossref.org/servlet/deposit", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/vnd.crossref.deposit+xml",
      },
      body: xml,
    });
    const text = await res.text();
    return {
      doi,
      status: res.ok ? "submitted" : "error",
      raw: text.slice(0, 500),
    };
  } catch (err) {
    return {
      doi,
      status: "error",
      raw: err instanceof Error ? err.message : "deposit failed",
    };
  }
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}
