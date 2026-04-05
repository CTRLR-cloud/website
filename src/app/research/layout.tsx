import { notFound } from "next/navigation";

/**
 * Research is temporarily hidden. Re-enable by restoring a layout that renders
 * `children` and exporting metadata from here or from `page.tsx`.
 */
export default function ResearchLayout({
  children: _children,
}: {
  children: React.ReactNode;
}) {
  notFound();
}
