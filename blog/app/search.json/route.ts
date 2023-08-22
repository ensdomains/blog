import { NextResponse } from 'next/server';

import { getPostsMetadata } from '@/lib/get_posts';

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
    const posts = await getPostsMetadata();

    return posts.map((post) => ({
        slug: post.slug,
    }));
}

export async function GET() {
    const postMetadata = await getPostsMetadata();

    const posts = await Promise.all(
        postMetadata.map(async (post) => ({
            meta: post,
            content: await import(`../../../content/${post.file}/readme.mdx`),
        }))
    );

    const data = posts.map((post) => ({
        ...post.meta,
        content: post.content.plainContent,
        readingTime: post.content.readingTime,
    }));

    return NextResponse.json(data);
}
