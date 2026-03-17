import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getS3Bucket, getS3Client } from "@/lib/s3";

export async function uploadImageFile(file: File, prefix: string) {
  const bytes = Buffer.from(await file.arrayBuffer());
  const ext =
    file.type === "image/png"
      ? "png"
      : file.type === "image/webp"
        ? "webp"
        : file.type === "image/gif"
          ? "gif"
          : "jpg";

  const key = `${prefix}/${new Date().toISOString().slice(0, 10)}/${crypto.randomUUID()}.${ext}`;
  const s3 = getS3Client();
  const bucket = getS3Bucket();

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: bytes,
      ContentType: file.type || "application/octet-stream"
    })
  );

  return key;
}

