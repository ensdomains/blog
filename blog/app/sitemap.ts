import { MetadataRoute } from 'next';

import { getPostsMetadata } from '@/lib/get_posts';

const BASE_URL = 'https://blog.ens.domains/';

const sitemap = async () => {
    const posts = await getPostsMetadata();

    return posts.map((post) => ({
        url: BASE_URL + post.slug,
        lastModified: post.date ?? new Date(),
    })) as MetadataRoute.Sitemap;
};

export default sitemap;
