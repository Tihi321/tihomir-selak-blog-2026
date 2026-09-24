import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import type { APIContext } from "astro";
import { isPublished, sortNewest, SITE_DESCRIPTION, SITE_TITLE } from "../site";

export async function GET(context: APIContext) {
  const articles = sortNewest(await getCollection("writing", isPublished));
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items: articles.map((article) => ({
      title: article.data.title,
      description: article.data.description,
      pubDate: article.data.publishedAt,
      link: `/writing/${article.id.replace(/\.(md|mdx)$/, "")}/`,
    })),
  });
}
