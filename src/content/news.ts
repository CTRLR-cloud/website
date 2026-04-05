export type NewsPost = {
  slug: string;
  category: string;
  type: string;
  date: string;
  readingMinutes: number;
  title: string;
  excerpt: string;
  image: string;
  body: Array<
    | { kind: "p"; text: string }
    | { kind: "h2"; text: string }
    | { kind: "ul"; items: string[] }
    | { kind: "blockquote"; text: string }
  >;
};

/** In-house news articles (optional). RSS stories are primary on `/news` when available. */
export const newsPosts: NewsPost[] = [];

export function getNewsPost(slug: string) {
  return newsPosts.find((p) => p.slug === slug);
}
