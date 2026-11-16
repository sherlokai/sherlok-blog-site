import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
	// Load Markdown and MDX files in the `src/content/blog/` directory.
	loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z
			.object({
				title: z.string(),
				description: z.string(),
				// Transform string to Date object
				pubDate: z.coerce.date().optional(),
				updatedDate: z.coerce.date().optional(),
				heroImage: z.optional(image()),
				// Fields the Sherlok Blog Writer writes: date, and the cover as a public path.
				date: z.coerce.date().optional(),
				image: z.string().optional(),
				image_alt: z.string().optional(),
				author: z.string().optional(),
				seo_title: z.string().optional(),
				excerpt: z.string().optional(),
				slug: z.string().optional(),
				sherlok_id: z.number().optional(),
			})
			.transform((post) => ({ ...post, pubDate: post.pubDate ?? post.date ?? new Date() })),
});

export const collections = { blog };
