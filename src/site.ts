export const SITE_TITLE = "Tihomir Selak — field notes";
export const SITE_DESCRIPTION =
  "Field notes on software, leadership, practical AI, and experiments that became useful.";
export const SITE_URL = "https://blog.tihomir-selak.from.hr";
export const PERSONAL_SITE_URL = "https://tihomir-selak.from.hr";

export function getReadingMinutes(body = ""): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 220));
}

export function sortNewest<T extends { data: { publishedAt: Date } }>(
  items: T[],
): T[] {
  return [...items].sort(
    (a, b) => b.data.publishedAt.getTime() - a.data.publishedAt.getTime(),
  );
}

export function topicLabel(topic: string): string {
  return topic.replaceAll("-", " ");
}

export function isPublished<T extends { id: string; data: { status: string } }>(
  article: T,
): boolean {
  return (
    article.data.status === "published" &&
    !article.id.startsWith("__playwright-fixture")
  );
}

export const EMAIL = "tihomir.selak@outlook.com";
export const LINKEDIN = "https://www.linkedin.com/in/selaktihomir/";
export const GITHUB = "https://github.com/Tihi321";
export const LOCATION = "Augsburg, Germany";

export interface WritingEntry {
  slug: string;
  date: string;
  title: string;
  href: string;
  topic: string;
  minutes: number;
}

export function articleSlug(article: { id: string }): string {
  return article.id.replace(/\.(md|mdx)$/, "");
}

export function toWritingEntry(
  article: {
    id: string;
    body?: string;
    data: { title: string; publishedAt: Date; topics: string[] };
  },
  draft = false,
): WritingEntry {
  const slug = articleSlug(article);
  return {
    slug,
    date: article.data.publishedAt.toISOString().slice(0, 10),
    title: article.data.title,
    href: draft ? `/draft-preview/${slug}/` : `/writing/${slug}/`,
    topic: topicLabel(article.data.topics[0] ?? ""),
    minutes: getReadingMinutes(article.body),
  };
}
