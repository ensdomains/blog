import { readFile } from 'node:fs/promises';

import { BlogPostMetadataSchema } from '../types/BlogPostMetadata';

export const getPost = async (path: string) => {
    const meta = await readFile(`../content/${path}/meta.json`);

    const meta_json = JSON.parse(meta.toString());

    // TODO: This should also return body parsed and mdx formatted
    return await BlogPostMetadataSchema.parseAsync(meta_json);
};
