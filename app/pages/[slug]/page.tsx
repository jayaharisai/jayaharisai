import PagePostClient from "./PagePostClient";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/** Generate a placeholder param so the static export builds the route */
export async function generateStaticParams() {
  return [{ slug: "placeholder" }];
}

export default async function PagePost({ params }: PageProps) {
  const { slug } = await params;
  return <PagePostClient slug={slug} />;
}
