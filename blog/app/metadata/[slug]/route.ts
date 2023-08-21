import { covers } from 'assets/assets';
import { NextRequest, NextResponse } from 'next/server';

import { getPostBySlug } from '@/lib/get_post_by_slug';
import { getPostsMetadata } from '@/lib/get_posts';

type PageProperties = {
    params: { slug: string };
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams(): Promise<
    PageProperties['params'][]
> {
    const posts = await getPostsMetadata();

    return posts.map((file) => ({ slug: file.slug + '.json' }));
}

export async function GET(_request: NextRequest, { params }: PageProperties) {
    const data = await getPostBySlug(params.slug.replace(/\.json$/, ''));

    // Find the cover image for the post
    const cover_data = Object.keys(covers).includes(data.file)
        ? covers[data.file as keyof typeof covers]
        : undefined;

    // Load the images in
    const cover_image = await cover_data?.['cover'];
    const cover_thumb_image = await cover_data?.['cover-thumb'];

    if (cover_data) {
        data.cover = cover_image?.default.src || data.cover;
        data['cover_thumb'] = cover_thumb_image?.default.src || data.cover;
    }

    return NextResponse.json(data);
}
