import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getSession } from "@/lib/auth";
import { buildStorageKey, createPresignedUpload } from "@/lib/storage";

const bodySchema = z.object({
  filename: z.string().min(1),
  contentType: z.string().min(1),
  manuscriptId: z.string().optional(),
  fileType: z
    .enum(["main", "supplementary", "figure", "cover-letter"])
    .default("main"),
});

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const json = await req.json();
    const data = bodySchema.parse(json);
    const storageKey = buildStorageKey({
      userId: session.id,
      manuscriptId: data.manuscriptId,
      filename: data.filename,
    });
    const presign = await createPresignedUpload({
      storageKey,
      contentType: data.contentType,
    });
    return NextResponse.json({ ...presign, fileType: data.fileType });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: err.flatten() }, { status: 400 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
