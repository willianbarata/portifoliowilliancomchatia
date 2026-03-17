import { LoginForm } from "./LoginForm";

export const dynamic = "force-dynamic";

export default async function AdminLoginPage({
  searchParams
}: {
  searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>;
}) {
  const sp = (searchParams instanceof Promise ? await searchParams : searchParams) ?? {};
  const rawNext = sp["next"];
  const next =
    typeof rawNext === "string" && rawNext.startsWith("/admin")
      ? rawNext
      : "/admin";

  return <LoginForm nextUrl={next} />;
}

