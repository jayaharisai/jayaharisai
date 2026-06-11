import { createClient } from "@supabase/supabase-js";
import PagePostClient from "./PagePostClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Hardcoded — same as lib/supabase.ts
const supabaseUrl = "https://pujuskutbupmerjhewvp.supabase.co";
const supabaseAnonKey = "sb_publishable_LfG3ZMdqASs8-Jis81hamw_IsWCwq68";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** Pull all known slugs from Supabase at build time */
export async function generateStaticParams() {
  try {
    const { data, error } = await supabase
      .from("pages")
      .select("slug");

    if (error || !data || data.length === 0) {
      return [{ slug: "_fallback" }];
    }

    return data.map((p: any) => ({ slug: p.slug }));
  } catch {
    return [{ slug: "_fallback" }];
  }
}

export default async function PagePost({ params }: PageProps) {
  const { slug } = await params;
  return <PagePostClient slug={slug} />;
}