import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { DocsContent } from "@/components/DocsContent";

export function DocsShell({ section }: { section?: string }) {
  return (
    <div className="min-h-screen flex flex-col">
      <SiteHeader />
      {/* DocsContent renders its own <main>. */}
      <div className="pt-16 flex-1">
        <DocsContent section={section} />
      </div>
      <SiteFooter />
    </div>
  );
}
