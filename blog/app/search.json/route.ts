import { NextResponse } from 'next/server';

import { getPostsMetadata } from '@/lib/get_posts';

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
    }));

    return NextResponse.json(data);
}
