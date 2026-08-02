import { redirect } from "next/navigation";

import { PlatformHome } from "@/components/home/platform-home";

type HomePageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

/**
 * Platform homepage. Temporary unlock compatibility:
 * /?unlock=... → /career-test?unlock=... (and any other query params).
 */
export default async function HomePage({ searchParams }: HomePageProps) {
  const params = (await searchParams) ?? {};

  if (params.unlock !== undefined) {
    const query = new URLSearchParams();
    for (const [key, value] of Object.entries(params)) {
      if (value === undefined) {
        continue;
      }
      if (Array.isArray(value)) {
        for (const item of value) {
          query.append(key, item);
        }
      } else {
        query.set(key, value);
      }
    }
    const qs = query.toString();
    redirect(qs ? `/career-test?${qs}` : "/career-test");
  }

  return <PlatformHome />;
}
