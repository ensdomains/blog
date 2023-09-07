import { unstable_cache } from 'next/cache';
import { readdir } from 'node:fs/promises';

import {
    BlogPostMetadata,
    BlogPostMetadataSchema,
} from '@/types/BlogPostMetadata';

export type BlogPostMetadataPlus = BlogPostMetadata & {
    file: string;
};

export const getPostsMetadata = async () => {
    const folderNames = await readdir('../content');

    return unstable_cache(_getPostsMetadata, [folderNames.join(',')], {})();
};

export const _getPostsMetadata = async (): Promise<BlogPostMetadataPlus[]> => {
    console.log('Loading posts metadata...');

    const posts: BlogPostMetadataPlus[] = [];

    // Load all posts from the content directory
    const files = await readdir('../content');

    // For each file, get the slug and file name
    for (const file of files) {
        const meta = await import(`../../../content/${file}/meta.json`);

        const pageMetadata = await BlogPostMetadataSchema.parseAsync(meta);

        // Filter out any draft posts in production
        if (pageMetadata.draft && process.env.NODE_ENV == 'production')
            continue;

        posts.push({ ...pageMetadata, file });
    }

    return posts.sort((a, b) => {
        const aDate = new Date(a.date);
        const bDate = new Date(b.date);

        if (aDate.getTime() == bDate.getTime()) return 0;

        return aDate.getTime() > bDate.getTime() ? -1 : 1;
    });
};
