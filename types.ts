export type PublishingMode = "SUBSCRIPTION" | "APC" | "HYBRID";

export type ManuscriptStatus =
  | "DRAFT"
  | "SUBMITTED"
  | "UNDER_REVIEW"
  | "REVISION_REQUESTED"
  | "REVISED"
  | "ACCEPTED"
  | "REJECTED"
  | "IN_PRODUCTION"
  | "PUBLISHED"
  | "WITHDRAWN";

export type UserRole =
  | "READER"
  | "AUTHOR"
  | "REVIEWER"
  | "HANDLING_EDITOR"
  | "EDITOR_IN_CHIEF"
  | "JOURNAL_ADMIN"
  | "PUBLISHER_ADMIN"
  | "LIBRARIAN";

export interface Journal {
  id: string;
  title: string;
  shortTitle?: string;
  description?: string;
  publishingMode: PublishingMode;
  apcAmount?: number;
  apcCurrency: string;
  /** Annual individual subscription price (major units) */
  subscriptionPrice?: number;
  reviewModel: string;
}

export interface Manuscript {
  id: string;
  title: string;
  abstract?: string;
  status: ManuscriptStatus;
  chosenMode?: PublishingMode;
  journalId: string;
  journalTitle?: string;
  submittedAt?: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  orcid?: string;
  affiliation?: string;
  roles: UserRole[];
}
