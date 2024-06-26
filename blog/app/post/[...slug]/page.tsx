import { covers } from 'assets/assets';
import { MDXProps } from 'mdx/types';
import { ResolvingMetadata } from 'next';
import { Fragment, JSX } from 'react';
import { Article, WithContext } from 'schema-dts';

import { PostCoverImage } from '@/components/post/PostCoverImage';
import { PostFooter } from '@/components/post/PostFooter';
import { PostHeader } from '@/components/post/PostHeader';
import { getPostBySlug } from '@/lib/get_post_by_slug';
import { getPostsMetadata } from '@/lib/get_posts';
import { createMetadata } from '@/lib/metadata';

type PageProperties = {
    params: { slug: string[] };
};

class AssetNotFoundError extends Error {
    constructor(asset: string) {
        super(`Asset ${asset} not found. Try doing pnpm build:assets`);
    }
}

export const generateMetadata = async (
    { params }: PageProperties,
    parent: ResolvingMetadata
) => {
    if (params.slug.length !== 1)
        throw new Error('Invalid slug ' + params.slug.join('/'));

    const post = await getPostBySlug(params.slug[0]);
    const parentMetadata = await parent;

    const postCovers = covers[post.file as keyof typeof covers];

    if (!postCovers) {
        throw new AssetNotFoundError(post.file);
    }

    const postCover = await postCovers.cover.then((cover) => cover.default);
    const postCoverThumb = await postCovers['cover-thumb'].then(
        (cover) => cover.default
    );

    return createMetadata(
        {
            title: `${post.title} | ENS Blog`,
            description: post.description,
            path: '/post/' + params.slug.join('/'),
        },
        parentMetadata,
        {
            openGraph: {
                type: 'article',
                title: `${post.title} | ENS Blog`,
                authors: post.authors,
                images: [
                    {
                        url: postCoverThumb.src,
                        width: postCoverThumb.width,
                        height: postCoverThumb.height,
                    },
                    {
                        url: postCover.src,
                        width: postCover.width,
                        height: postCover.height,
                    },
                ],
                description: post.description,
                tags: post.tags,
                url: '/post/' + params.slug.join('/'),
            },
            twitter: {
                title: `${post.title} | ENS Blog`,
                description: post.description,
                card: 'summary_large_image',
            },
            authors: post.authors?.map((author) => ({
                name: author,
                url: `https://ens.app/${author}`,
            })),
        }
    );
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
    const pages = await getPostsMetadata();

    return pages.map((post) => ({
        slug: post.slug.split('/'),
    }));
}

const page = async ({ params }: PageProperties) => {
    if (params.slug.length !== 1)
        throw new Error('Invalid slug ' + params.slug.join('/'));

    const post = await getPostBySlug(params.slug[0]);

    const { default: PostContent, readingTime } = (await import(
        `../../../../content/${post.file}/readme.mdx`
    )) as {
        default: (_properties: MDXProps) => JSX.Element;
        readingTime: string;
    };

    const postImageData = await covers[post.file as keyof typeof covers]?.[
        'cover-thumb'
    ];
    const postImage = postImageData?.default?.src;

    const schema: WithContext<Article> = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        image: postImage,
        datePublished: new Date(post.date).toISOString(),
        author: post.authors?.map((author) => ({
            '@type': 'Person',
            name: author,
            url: 'https://ens.app/' + author,
        })),
    };

    return (
        <section>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
            />

            <article>
                <PostHeader post={post} readingTime={readingTime} />
                <PostCoverImage post={post} />
                <div className="prose lg:prose-xl mx-auto block w-full max-w-3xl">
                    <PostContent />
                    {/* Hydration errors occur when PostContent is the only child in the parent div. */}
                    <Fragment />
                </div>
                <PostFooter post={post} />
            </article>
        </section>
    );
};

export default page;
