import { MetadataRoute } from 'next';

import { getPostsMetadata } from '@/lib/get_posts';

import { generateStaticParams as homeSlugs } from './[[...page]]/page'; // Home + pagination
// Posts + pagination
import { generateStaticParams as tagsSlugs } from './tag/[tag]/[[...page]]/page'; // Tags + Pagination

const BASE_URL = 'https://blog.ens.domains/';

const sitemap = async (): Promise<MetadataRoute.Sitemap> => {
    const homes = await homeSlugs();
    const posts = await getPostsMetadata();
    const tags = await tagsSlugs();

    // return posts.map((post) => ({
    //     url: BASE_URL + post.slug,
    //     lastModified: post.date ?? new Date(),
    // })) as MetadataRoute.Sitemap;

    const now = new Date();

    return [
        ...homes.map(({ page }) => ({
            url: BASE_URL + (page.length > 0 ? page.join('\n') : ''),
            lastModified: now,
        })),
        ...posts.map((post) => ({
            url: BASE_URL + `post/${post.slug}`,
            lastModified: post.date ?? now,
        })),
        ...tags.map(({ tag, page }) => ({
            url: BASE_URL + `tag/${tag}/${page.join('\n')}`,
            lastModified: now,
        })),
    ];
};

export default sitemap;
