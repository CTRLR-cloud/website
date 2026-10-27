import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SECTIONS } from "@/content/docs";
import { DocsShell } from "@/components/DocsShell";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ section: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  // The first section is served at /docs; /docs/what-is-ctrlr redirects there.
  return SECTIONS.slice(1).map((s) => ({ section: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const current = SECTIONS.find((s) => s.id === section);
  if (!current) return {};
  const topics = current.toc?.map((t) => t.label).join(", ");
  return pageMetadata({
    title: `Docs: ${current.label}`,
    description: topics
      ? `CTRL+R docs: ${current.label}. Covers ${topics}.`
      : `CTRL+R docs: ${current.label}.`,
    // /docs shows the first section, so that section's own page points search engines at /docs.
    path: current.id === SECTIONS[0].id ? "/docs" : `/docs/${current.id}`,
  });
}

export default async function DocsSectionPage({ params }: Props) {
  const { section } = await params;
  if (!SECTIONS.some((s) => s.id === section)) notFound();
  return <DocsShell section={section} />;
}
