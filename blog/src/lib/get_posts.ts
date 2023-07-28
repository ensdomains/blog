import { readdir, readFile } from 'node:fs/promises';

import {
    BlogPostMetadata,
    BlogPostMetadataSchema,
} from '@/types/BlogPostMetadata';

export type BlogPostMetadataPlus = BlogPostMetadata & {
    file: string;
};

export const getPosts = async () => {
    const posts: BlogPostMetadataPlus[] = [];

    // Load all posts from the content directory
    const files = await readdir('../content');

    // For each file, get the slug and file name
    for (const file of files) {
        const meta = await readFile(`../content/${file}/meta.json`);

        const meta_json = JSON.parse(meta.toString());

        const pageMetadata = await BlogPostMetadataSchema.parseAsync(meta_json);

        // TODO: Load metadata or extra info for a file.
        // NOTE: keep this lightweight as it runs during dev for every page

        posts.push({ ...pageMetadata, file });
    }

    return posts;
};
