import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DocsContent } from "@/components/DocsContent";

export const metadata: Metadata = {
  title: "Docs",
  description: "Learn how to connect, configure, and operate your robots with CTRL+R.",
};

export default function DocsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      <main className="pt-16 flex-1">
        <DocsContent />
      </main>
      <SiteFooter />
    </div>
  );
}
