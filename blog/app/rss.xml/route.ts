import { covers } from 'assets/assets';
import { Feed } from 'feed';

import { getPostsMetadata } from '@/lib/get_posts';
export const GET = async (request: Request) => {
    const feed = new Feed({
        title: 'ENS Blog',
        description: 'The official blog of the Ethereum Name Service',
        link: 'https://blog.ens.domains',
        language: 'en',
        image: 'https://blog.ens.domains/opengraph.jpg',
        generator: 'NextJS on Edgeserver',
        feedLinks: {
            atom: 'https://blog.ens.domains/rss.xml',
        },
        id: 'https://blog.ens.domains',
        copyright: '© ENS Domains',
    });

    const posts = await getPostsMetadata();

    for (const post of posts) {
        const postCovers = covers[post.file as keyof typeof covers];
        const postCoverThumb = await postCovers['cover-thumb'].then(
            (cover) => cover.default
        );

        feed.addItem({
            title: post.title,
            guid: 'https://blog.ens.domains/post/' + post.slug,
            link: 'https://blog.ens.domains/post/' + post.slug,
            date: new Date(post.date),
            description: post.description,
            author: post.authors.map((author) => {
                return {
                    name: author,
                    link: 'https://blog.ens.domains/author/' + author,
                };
            }),
            image: postCoverThumb.src,
        });
    }

    return new Response(feed.atom1(), {
        headers: {
            'Content-Type': 'application/atom+xml; charset=utf-8',
        },
    });
};
