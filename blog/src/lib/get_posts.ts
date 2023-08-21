import { unstable_cache } from 'next/cache';
import { readdir } from 'node:fs/promises';

import {
    BlogPostMetadata,
    BlogPostMetadataSchema,
} from '@/types/BlogPostMetadata';

export type BlogPostMetadataPlus = BlogPostMetadata & {
    file: string;
    cover_thumb: string;
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

        // TODO: Load metadata or extra info for a file.
        // NOTE: keep this lightweight as it runs during dev for every page

        posts.push({ ...pageMetadata, file });
    }

    return posts.sort((a, b) => {
        return new Date(a.date).getTime() > new Date(b.date).getTime() ? -1 : 1;
    });
};
