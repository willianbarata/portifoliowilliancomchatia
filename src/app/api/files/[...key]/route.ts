import { NextResponse } from "next/server";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { getS3Bucket, getS3Client } from "@/lib/s3";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ key: string[] }> }
) {
  const { key } = await params;
  const objectKey = key.join("/");

  if (!objectKey || objectKey.includes("..")) {
    return NextResponse.json({ error: "Invalid key" }, { status: 400 });
  }

  const s3 = getS3Client();
  const bucket = getS3Bucket();
  const url = await getSignedUrl(
    s3,
    new GetObjectCommand({ Bucket: bucket, Key: objectKey }),
    { expiresIn: 60 }
  );

  return NextResponse.redirect(url, 302);
}

