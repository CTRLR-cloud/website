import type { Metadata } from "next";
import { DocsShell } from "@/components/DocsShell";

export const metadata: Metadata = {
  title: "Docs",
  description: "Learn how to connect, configure, and operate your robots with CTRL+R.",
};

export default function DocsPage() {
  return <DocsShell />;
}
