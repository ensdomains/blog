import { MDXProps } from 'mdx/types';
import { ResolvingMetadata } from 'next';
import { JSX } from 'react';

import { PostCoverImage } from '@/components/PostCoverImage';
import { PostHeader } from '@/components/PostHeader';
import { getPostBySlug } from '@/lib/get_post_by_slug';
import { getPostsMetadata } from '@/lib/get_posts';
import { createMetadata } from '@/lib/metadata';

type PageProperties = {
    params: { slug: string[] };
};

export const generateMetadata = async (
    { params }: PageProperties,
    parent: ResolvingMetadata
) => {
    if (params.slug.length !== 1)
        throw new Error('Invalid slug ' + params.slug.join('/'));

    const post = await getPostBySlug(params.slug[0]);
    const parentMetadata = await parent;

    return createMetadata(
        {
            title: post.title,
            description: post.description,
            path: params.slug.join('/'),
        },
        parentMetadata,
        {
            openGraph: {
                type: 'article',
                title: post.title,
                authors: post.authors?.map((author) => author),
                images: post.cover,
                description: post.description,
                tags: post.tags,
            },
            twitter: {
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

    const { default: PostContent } = (await import(
        `../../../content/${post.file}/readme.mdx`
    )) as {
        default: (properties: MDXProps) => JSX.Element;
    };

    return (
        <article className="prose lg:prose-xl">
            <PostHeader post={post} />
            <PostCoverImage post={post} />
            <PostContent />
        </article>
    );
};

export default page;
