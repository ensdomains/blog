import { Avatar, avatars, Cover, covers } from 'assets/assets';
import { NextRequest, NextResponse } from 'next/server';

import { getPostBySlug } from '@/lib/get_post_by_slug';
import { BlogPostMetadataPlus, getPostsMetadata } from '@/lib/get_posts';

type PageProperties = {
    params: { slug: string };
};

type Metadata = BlogPostMetadataPlus & {
    assets: {
        covers: Partial<Record<Cover, string>>;
        avatars: Partial<Record<Avatar, string>>;
    };
    // Partial<Record<Cover, string> & Record<Avatar, string>>;
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams(): Promise<
    PageProperties['params'][]
> {
    const posts = await getPostsMetadata();

    return posts.map((file) => ({ slug: file.slug + '.json' }));
}

export async function GET(_request: NextRequest, { params }: PageProperties) {
    const postData = await getPostBySlug(params.slug.replace(/\.json$/, ''));

    const data: Metadata = {
        ...postData,
        assets: {
            covers: {},
            avatars: {},
        },
    };

    // Find the cover image for the post
    const cover_data: (typeof covers)[keyof typeof covers] | undefined =
        covers[data.file];

    if (cover_data) {
        for (const [key, cover] of Object.entries(cover_data)) {
            const awaitedData = await cover;

            data.assets.covers[key] = awaitedData.default.src || data['cover'];
        }
    }

    for (const author of data.authors) {
        const avatar_data: (typeof avatars)[keyof typeof avatars] | undefined =
            avatars[author];

        console.log({ avatar_data, author, avatars });

        if (avatar_data) {
            for (const [key, avatar] of Object.entries(avatar_data)) {
                if (!data.assets.avatars[author]) {
                    data.assets.avatars[author] = {};
                }

                const awaitedData = await avatar;

                console.log({ awaitedData: awaitedData.default });

                data.assets.avatars[author][key] =
                    awaitedData.default.src || data[key];
            }
        }
    }

    return NextResponse.json(data);
}
