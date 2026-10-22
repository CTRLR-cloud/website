import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SECTIONS } from "@/content/docs";
import { DocsShell } from "@/components/DocsShell";

type Props = { params: Promise<{ section: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return SECTIONS.map((s) => ({ section: s.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { section } = await params;
  const current = SECTIONS.find((s) => s.id === section);
  return current ? { title: `Docs: ${current.label}` } : {};
}

export default async function DocsSectionPage({ params }: Props) {
  const { section } = await params;
  if (!SECTIONS.some((s) => s.id === section)) notFound();
  return <DocsShell section={section} />;
}
