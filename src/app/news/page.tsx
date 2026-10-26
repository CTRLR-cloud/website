import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { getCachedStoriesForNews } from "@/lib/roboticsFeeds";
import { NewsPageContent } from "@/app/news/NewsPageContent";

export const metadata: Metadata = pageMetadata({
  title: "News",
  description: "The latest stories in robotics and physical AI, collected by CTRL+R.",
  path: "/news",
});

export default async function NewsPage() {
  const stories = await getCachedStoriesForNews();
  return <NewsPageContent stories={stories ?? undefined} />;
}
