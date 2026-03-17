import { S3Client } from "@aws-sdk/client-s3";

function requiredEnv(name: string) {
  const value = process.env[name];
  if (!value) throw new Error(`Missing env var: ${name}`);
  return value;
}

export function getS3Client() {
  const endpoint = requiredEnv("S3_ENDPOINT");
  const accessKeyId = requiredEnv("S3_ACCESS_KEY");
  const secretAccessKey = requiredEnv("S3_SECRET_KEY");
  const region = process.env.S3_REGION || "us-east-1";
  const forcePathStyle =
    (process.env.S3_FORCE_PATH_STYLE || "true").toLowerCase() === "true";

  return new S3Client({
    region,
    endpoint,
    forcePathStyle,
    credentials: { accessKeyId, secretAccessKey }
  });
}

export function getS3Bucket() {
  return requiredEnv("S3_BUCKET");
}

