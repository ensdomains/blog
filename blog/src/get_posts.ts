import { readdir } from 'node:fs/promises';

type PostData = {
    slug: string;
    file: string;
};

export const getPosts = async () => {
    const posts: PostData[] = [];

    // Load all posts from the content directory
    const files = await readdir('../content');

    // For each file, get the slug and file name
    for (const file of files) {
        const slug = file.replace(/\.mdx$/, '');

        // TODO: Load metadata or extra info for a file.
        // NOTE: keep this lightweight as it runs during dev for every page

        posts.push({
            slug,
            file,
        });
    }

    return posts;
};
