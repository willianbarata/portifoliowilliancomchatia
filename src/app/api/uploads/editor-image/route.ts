import { NextResponse } from "next/server";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getS3Bucket, getS3Client } from "@/lib/s3";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const form = await req.formData();
  const file = form.get("image");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { success: 0, error: "Missing file field 'image'" },
      { status: 400 }
    );
  }

  const s3 = getS3Client();
  const bucket = getS3Bucket();

  const bytes = Buffer.from(await file.arrayBuffer());
  const ext =
    file.type === "image/png"
      ? "png"
      : file.type === "image/webp"
        ? "webp"
        : file.type === "image/gif"
          ? "gif"
          : "jpg";
  const key = `uploads/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: bytes,
      ContentType: file.type || "application/octet-stream"
    })
  );

  const url = `/api/files/${encodeURIComponent(key).replaceAll("%2F", "/")}`;

  return NextResponse.json({
    success: 1,
    file: { url }
  });
}

