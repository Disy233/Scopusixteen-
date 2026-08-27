# Scopusixteen Database Schema (Prisma-style)

```prisma
// schema.prisma (excerpt – expand as needed)

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  READER
  AUTHOR
  REVIEWER
  HANDLING_EDITOR
  EDITOR_IN_CHIEF
  JOURNAL_ADMIN
  PUBLISHER_ADMIN
  LIBRARIAN
}

enum PublishingMode {
  SUBSCRIPTION
  APC
  HYBRID
}

enum ManuscriptStatus {
  DRAFT
  SUBMITTED
  UNDER_REVIEW
  REVISION_REQUESTED
  REVISED
  ACCEPTED
  REJECTED
  IN_PRODUCTION
  PUBLISHED
  WITHDRAWN
}

enum ReviewRecommendation {
  ACCEPT
  MINOR_REVISION
  MAJOR_REVISION
  REJECT
}

enum Licence {
  CC_BY
  CC_BY_NC
  CC_BY_NC_ND
  COPYRIGHT_TRANSFER
  EXCLUSIVE_LICENCE
}

model User {
  id            String   @id @default(cuid())
  email         String   @unique
  name          String?
  orcid         String?  @unique
  affiliation   String?
  roles         Role[]
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt

  manuscripts   Manuscript[] @relation("AuthorManuscripts")
  reviews       Review[]
  decisions     Decision[]
  subscriptions Subscription[]
  payments      Payment[]
}

model Journal {
  id                String         @id @default(cuid())
  title             String
  shortTitle        String?
  issn              String?
  eissn             String?
  description       String?
  scope             String?
  publishingMode    PublishingMode @default(HYBRID)
  apcAmount         Decimal?       // in major currency unit
  apcCurrency       String         @default("USD")
  subscriptionPrice Decimal?
  reviewModel       String         // "double-blind" | "single-blind" | "open"
  isActive          Boolean        @default(true)
  createdAt         DateTime       @default(now())
  updatedAt         DateTime       @updatedAt

  manuscripts       Manuscript[]
  articles          Article[]
  subscriptions     Subscription[]
}

model Manuscript {
  id              String           @id @default(cuid())
  title           String
  abstract        String?
  keywords        String[]
  status          ManuscriptStatus @default(DRAFT)
  chosenMode      PublishingMode?  // final choice at acceptance
  journalId       String
  journal         Journal          @relation(fields: [journalId], references: [id])
  correspondingAuthorId String
  correspondingAuthor   User       @relation("AuthorManuscripts", fields: [correspondingAuthorId], references: [id])
  coAuthors       Json?            // array of {name, email, orcid, affiliation}
  files           ManuscriptFile[]
  versions        ManuscriptVersion[]
  reviews         Review[]
  decisions       Decision[]
  aiAnalyses      AiAnalysis[]
  createdAt       DateTime         @default(now())
  updatedAt       DateTime         @updatedAt
  submittedAt     DateTime?
  acceptedAt      DateTime?
}

model ManuscriptFile {
  id            String     @id @default(cuid())
  manuscriptId  String
  manuscript    Manuscript @relation(fields: [manuscriptId], references: [id])
  type          String     // "main" | "supplementary" | "figure" | "cover-letter"
  filename      String
  storageKey    String     // S3 key
  mimeType      String
  sizeBytes     Int
  uploadedAt    DateTime   @default(now())
}

model ManuscriptVersion {
  id            String     @id @default(cuid())
  manuscriptId  String
  manuscript    Manuscript @relation(fields: [manuscriptId], references: [id])
  versionNumber Int
  label         String?    // "original" | "R1" | "R2"
  storageKey    String
  createdAt     DateTime   @default(now())
}

model Review {
  id              String               @id @default(cuid())
  manuscriptId    String
  manuscript      Manuscript           @relation(fields: [manuscriptId], references: [id])
  reviewerId      String
  reviewer        User                 @relation(fields: [reviewerId], references: [id])
  invitationSentAt DateTime?
  acceptedAt      DateTime?
  declinedAt      DateTime?
  dueDate         DateTime?
  submittedAt     DateTime?
  recommendation  ReviewRecommendation?
  commentsToAuthor String?
  commentsToEditor String?
  score           Int?                 // 1-5 or custom
  createdAt       DateTime             @default(now())
  updatedAt       DateTime             @updatedAt
}

model Decision {
  id            String     @id @default(cuid())
  manuscriptId  String
  manuscript    Manuscript @relation(fields: [manuscriptId], references: [id])
  editorId      String
  editor        User       @relation(fields: [editorId], references: [id])
  decisionType  String     // "accept" | "minor" | "major" | "reject" | "transfer"
  letter        String?
  createdAt     DateTime   @default(now())
}

model Article {
  id              String     @id @default(cuid())
  manuscriptId    String     @unique
  journalId       String
  journal         Journal    @relation(fields: [journalId], references: [id])
  title           String
  abstract        String?
  doi             String?    @unique
  licence         Licence
  publishedAt     DateTime?
  volume          String?
  issue           String?
  pages           String?
  htmlContent     String?    // or storage key
  pdfKey          String?
  isOpenAccess    Boolean    @default(false)
  viewCount       Int        @default(0)
  downloadCount   Int        @default(0)
  citationCount   Int        @default(0)
  createdAt       DateTime   @default(now())
  updatedAt       DateTime   @updatedAt
}

model Subscription {
  id              String     @id @default(cuid())
  userId          String?    // individual
  user            User?      @relation(fields: [userId], references: [id])
  institutionName String?    // institutional
  journalId       String?
  journal         Journal?   @relation(fields: [journalId], references: [id])
  startDate       DateTime
  endDate         DateTime?
  status          String     // "active" | "expired" | "cancelled"
  stripeSubId     String?
  createdAt       DateTime   @default(now())
}

model Payment {
  id              String     @id @default(cuid())
  userId          String
  user            User       @relation(fields: [userId], references: [id])
  manuscriptId    String?    // for APC
  type            String     // "APC" | "SUBSCRIPTION" | "PAY_PER_VIEW"
  amount          Decimal
  currency        String
  status          String     // "pending" | "paid" | "failed" | "refunded" | "waived"
  stripePaymentId String?
  invoiceNumber   String?
  createdAt       DateTime   @default(now())
  paidAt          DateTime?
}

model AiAnalysis {
  id            String     @id @default(cuid())
  manuscriptId  String
  manuscript    Manuscript @relation(fields: [manuscriptId], references: [id])
  type          String     // "language" | "similarity" | "reviewer-match" | "integrity" | "summary"
  result        Json
  model         String?
  createdAt     DateTime   @default(now())
}

model InstitutionAgreement {
  id            String   @id @default(cuid())
  name          String
  country       String?
  coverageType  String   // "full" | "discount" | "fixed"
  discountPct   Int?
  maxApcCovered Decimal?
  journals      String[] // journal ids or "all"
  validFrom     DateTime
  validTo       DateTime?
  createdAt     DateTime @default(now())
}
```

Notes:
- Use soft deletes or status flags for important records.
- Add indexes on status, journalId, correspondingAuthorId, doi, etc.
- Store large text (full HTML, long reviews) carefully; consider separate storage for very large content.
- Embeddings for AI matching can live in a separate table or use pgvector extension.
