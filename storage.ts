/**
 * Object storage helper.
 * Production: use @aws-sdk/client-s3 + @aws-sdk/s3-request-presigner.
 * This module provides a clean interface; install AWS SDK when ready.
 */

export interface PresignResult {
  storageKey: string;
  uploadUrl: string | null;
  method: "PUT";
  headers: Record<string, string>;
  demo?: boolean;
  message?: string;
}

export function buildStorageKey(opts: {
  userId: string;
  manuscriptId?: string;
  filename: string;
}): string {
  const safe = opts.filename.replace(/[^a-zA-Z0-9._-]/g, "_");
  const id = crypto.randomUUID();
  return `manuscripts/${opts.userId}/${opts.manuscriptId || "draft"}/${id}-${safe}`;
}

export async function createPresignedUpload(opts: {
  storageKey: string;
  contentType: string;
  expiresInSeconds?: number;
}): Promise<PresignResult> {
  const configured =
    process.env.S3_BUCKET &&
    process.env.S3_ACCESS_KEY &&
    process.env.S3_SECRET_KEY;

  if (!configured) {
    return {
      storageKey: opts.storageKey,
      uploadUrl: null,
      method: "PUT",
      headers: { "Content-Type": opts.contentType },
      demo: true,
      message:
        "S3 not configured. Install @aws-sdk/client-s3 and set S3_* env vars for real presigned URLs.",
    };
  }

  // Real implementation outline (uncomment after npm install @aws-sdk/client-s3 @aws-sdk/s3-request-presigner):
  //
  // import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
  // import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
  // const client = new S3Client({
  //   region: process.env.S3_REGION || "auto",
  //   endpoint: process.env.S3_ENDPOINT,
  //   credentials: {
  //     accessKeyId: process.env.S3_ACCESS_KEY!,
  //     secretAccessKey: process.env.S3_SECRET_KEY!,
  //   },
  // });
  // const command = new PutObjectCommand({
  //   Bucket: process.env.S3_BUCKET!,
  //   Key: opts.storageKey,
  //   ContentType: opts.contentType,
  // });
  // const uploadUrl = await getSignedUrl(client, command, {
  //   expiresIn: opts.expiresInSeconds || 600,
  // });

  const endpoint = process.env.S3_ENDPOINT || "https://s3.amazonaws.com";
  const bucket = process.env.S3_BUCKET;
  return {
    storageKey: opts.storageKey,
    uploadUrl: `${endpoint}/${bucket}/${opts.storageKey}?X-Amz-Expires=600&X-Amz-Signature=configure-aws-sdk`,
    method: "PUT",
    headers: { "Content-Type": opts.contentType },
    message:
      "Placeholder URL. Install AWS SDK and use getSignedUrl for production.",
  };
}

export function publicUrlForKey(storageKey: string): string | null {
  if (!process.env.S3_BUCKET) return null;
  const base =
    process.env.S3_PUBLIC_URL ||
    process.env.S3_ENDPOINT ||
    `https://${process.env.S3_BUCKET}.s3.amazonaws.com`;
  return `${base.replace(/\/$/, "")}/${storageKey}`;
}
