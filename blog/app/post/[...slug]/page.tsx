import { MDXProps } from 'mdx/types';
import { ResolvingMetadata } from 'next';
import { Fragment, JSX } from 'react';
import { Article, WithContext } from 'schema-dts';

import { PostCoverImage } from '@/components/PostCoverImage';
import { PostHeader } from '@/components/PostHeader';
import { getPostBySlug } from '@/lib/get_post_by_slug';
import { getPostsSlugs } from '@/lib/get_posts';
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
    return getPostsSlugs();
}

const page = async ({ params }: PageProperties) => {
    if (params.slug.length !== 1)
        throw new Error('Invalid slug ' + params.slug.join('/'));

    const post = await getPostBySlug(params.slug[0]);

    const { default: PostContent, readingTime } = (await import(
        `../../../../content/${post.file}/readme.mdx`
    )) as {
        default: (properties: MDXProps) => JSX.Element;
        readingTime: string;
    };

    const schema: WithContext<Article> = {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: post.title,
        image: post.cover,
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
            </article>
        </section>
    );
};

export default page;