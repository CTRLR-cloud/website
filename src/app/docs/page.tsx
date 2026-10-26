import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { DocsShell } from "@/components/DocsShell";

export const metadata: Metadata = pageMetadata({
  title: "Docs",
  description:
    "Learn how to connect, configure, and operate your robots, drones, and other devices with CTRL+R.",
  path: "/docs",
});

export default function DocsPage() {
  return <DocsShell />;
}
