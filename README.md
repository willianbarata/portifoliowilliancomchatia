# Willian Barata — Portfolio + Blog + Admin + Chatbot

## Requisitos
- Node.js 20+
- Postgres (externo) + pgvector
- MinIO (S3 compatível)

## Variáveis de ambiente
Crie as variáveis no Easypanel (recomendado) ou em `.env` local:

- `DATABASE_URL`
- `AUTH_SECRET`
- `NEXTAUTH_URL` (ex: https://seu-dominio.com)
- `ADMIN_EMAIL`
- `ADMIN_PASSWORD`
- `S3_ENDPOINT`
- `S3_ACCESS_KEY`
- `S3_SECRET_KEY`
- `S3_BUCKET`
- `S3_REGION`
- `S3_FORCE_PATH_STYLE=true`
- `OPENAI_API_KEY`
- `OPENAI_MODEL=gpt-4o-mini`

### Importante (schema do Postgres)
Para evitar conflito com outras tabelas no mesmo banco, recomendo usar um schema dedicado:
`.../postgresqlpdf?sslmode=disable&schema=willianbarata`

### FAQ embeddings (sem pgvector)
Seu Postgres atual não possui a extensão `pgvector` instalada. Por isso os embeddings do FAQ são armazenados como `DOUBLE PRECISION[]` e a similaridade é calculada no backend.

## Rodar local
1. `npm ci`
2. `npm run dev` (porta 3087)

## Deploy no Easypanel
Use o `Dockerfile`. O container executa:
- `prisma migrate deploy`
- `prisma/seed.js` (idempotente)
- `next start`
