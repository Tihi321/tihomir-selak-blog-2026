import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const writing = defineCollection({
  loader: glob({ base: "./src/content/writing", pattern: "**/*.{md,mdx}" }),
  schema: z
    .object({
      title: z.string().min(1),
      description: z.string().min(1),
      publishedAt: z.coerce.date(),
      updatedAt: z.coerce.date().optional(),
      status: z.enum(["draft", "published"]),
      topics: z.array(z.string().regex(/^[a-z0-9-]+$/)).default([]),
      featured: z.boolean().default(false),
      hero: z.string().optional(),
      heroAlt: z.string().optional(),
      canonicalUrl: z.url().optional(),
      originalPath: z.string().optional(),
      revisionNote: z.string().optional(),
      sources: z
        .array(z.object({ title: z.string(), url: z.url() }))
        .default([]),
    })
    .superRefine((article, context) => {
      if (article.status === "published" && article.topics.length === 0) {
        context.addIssue({
          code: "custom",
          message: "Published writing needs at least one topic.",
          path: ["topics"],
        });
      }
      if (article.hero && !article.heroAlt?.trim()) {
        context.addIssue({
          code: "custom",
          message: "Hero images need useful alt text.",
          path: ["heroAlt"],
        });
      }
    }),
});

export const collections = { writing };
