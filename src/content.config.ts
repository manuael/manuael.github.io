import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const entries = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/entries' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    type: z.enum(['note', 'game', 'experiment']),
    tags: z.array(z.string()).default([]),
    permalink: z.string().optional(),
    interactive: z.enum(['game-of-life']).optional(),
    status: z.enum(['Prototype', 'In progress', 'Finished']).optional(),
    cover: z.string().optional(),
    playUrl: z.string().optional(),
    externalUrl: z.url().optional(),
    controls: z.string().optional(),
  }),
});

export const collections = { entries };
