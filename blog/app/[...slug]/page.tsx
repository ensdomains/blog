import { MDXProps } from 'mdx/types';
import { JSX } from 'react';

import { PostCoverImage } from '@/components/PostCoverImage';
import { PostHeader } from '@/components/PostHeader';
import { getPostBySlug } from '@/lib/get_post_by_slug';
import { getPostsMetadata } from '@/lib/get_posts';

type PageProperties = {
    params: { slug: string[] };
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
        <div>
            <PostHeader post={post} />
            <PostCoverImage post={post} />
            <article className="prose lg:prose-xl">
                <PostContent />
            </article>
        </div>
    );
};

export default page;
