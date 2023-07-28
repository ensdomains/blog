import { cache } from 'react';

import { getPostsMetadata } from './get_posts';

export const getPostBySlug = cache(async (slug: string) => {
    const allPosts = await getPostsMetadata();

    const post = allPosts.find((post) => post.slug === slug);

    if (!post) {
        throw new Error(`No post found with slug ${slug}`);
    }

    return post;
});
