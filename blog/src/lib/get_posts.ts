import { readdir } from 'node:fs/promises';

// import { cache } from 'react';
import {
    BlogPostMetadata,
    BlogPostMetadataSchema,
} from '@/types/BlogPostMetadata';

export type BlogPostMetadataPlus = BlogPostMetadata & {
    file: string;
};

let cache: BlogPostMetadataPlus[] | null;

export const getPostsMetadata = async (): Promise<BlogPostMetadataPlus[]> => {
    if (cache) return cache;

    const posts: BlogPostMetadataPlus[] = [];

    // Load all posts from the content directory
    const files = await readdir('../content');

    // For each file, get the slug and file name
    for (const file of files) {
        const meta = await import(`../../../content/${file}/meta.json`);

        const pageMetadata = await BlogPostMetadataSchema.parseAsync(meta);

        // TODO: Load metadata or extra info for a file.
        // NOTE: keep this lightweight as it runs during dev for every page

        posts.push({ ...pageMetadata, file });
    }

    const result = posts.sort((a, b) => {
        return new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1;
    });

    cache = result;

    return result;
};

export const getPostsSlugs = async (): Promise<
    {
        slug: string[];
    }[]
> => {
    const pages = await getPostsMetadata();

    return pages.map((post) => ({
        slug: post.slug.split('/'),
    }));
};
