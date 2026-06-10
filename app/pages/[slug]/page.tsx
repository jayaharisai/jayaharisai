import { readFileSync, existsSync } from "fs";
import { resolve } from "path";
import PagePostClient from "./PagePostClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Pre-render known slugs at build time from published-pages.json */
export function generateStaticParams() {
  const filePath = resolve(process.cwd(), "data", "published-pages.json");
  if (!existsSync(filePath)) {
    return [{ slug: "_empty" }];
  }
  try {
    const raw = readFileSync(filePath, "utf-8");
    const pages = JSON.parse(raw);
    if (!Array.isArray(pages) || pages.length === 0) {
      return [{ slug: "_empty" }];
    }
    return pages.map((p: any) => ({ slug: p.slug }));
  } catch {
    return [{ slug: "_empty" }];
  }
}

export default async function PagePost({ params }: PageProps) {
  const { slug } = await params;
  return <PagePostClient slug={slug} />;
}