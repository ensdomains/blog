/* eslint-disable sonarjs/no-duplicate-string */
import { ResolvingMetadata } from 'next';

import { PageButtons } from '@/components/PageButtons';
import { BlogPostPreview } from '@/components/PostPreview';
import { parseTag } from '@/components/tags/tagutils';
import { getTags } from '@/lib/get_tags';
import { createMetadata } from '@/lib/metadata';
import { splitArray } from '@/lib/split_array';

const MAX_PER_PAGE = 6;

type PageProperties = {
    params: { tag: string; page: string[] };
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams(): Promise<
    PageProperties['params'][]
> {
    const tags = await getTags();

    return Object.entries(tags).flatMap(([tag, posts]) => {
        const pages = splitArray(posts, MAX_PER_PAGE);

        return pages.map((_, index) => ({
            tag,
            page: [index === 0 ? '' : (index + 1).toString()],
        }));
    });
}

export const generateMetadata = async (
    { params }: PageProperties,
    parent: ResolvingMetadata
) => {
    const parentMetadata = await parent;

    return createMetadata(
        {
            title: `${parseTag(params.tag)} articles | ENS Blog`,
            description: 'The official blog of the Ethereum Name Service',
            path: `/tag/${params.tag}${
                // eslint-disable-next-line sonarjs/no-nested-template-literals
                params.page ? `/${params.page.join('/')}` : ''
            }`,
        },
        parentMetadata,
        {
            openGraph: {
                type: 'website',
                images: '/opengraph.jpg',
                title: `${parseTag(params.tag)} articles | ENS Blog`,
                description: 'The official blog of the Ethereum Name Service',
                url: `/tag/${params.tag}${
                    // eslint-disable-next-line sonarjs/no-nested-template-literals
                    params.page ? `/${params.page.join('/')}` : ''
                }`,
                siteName: 'ENS Blog',
            },
            twitter: {
                title: `${parseTag(params.tag)} articles | ENS Blog`,
                description: 'The official blog of the Ethereum Name Service',
                card: 'summary_large_image',
            },
        }
    );
};

const page = async ({ params }: PageProperties) => {
    const tags = await getTags();

    const postsUnlimited = tags[params.tag];

    if (!postsUnlimited) throw new Error('Tag not found');

    const pages = splitArray(postsUnlimited, MAX_PER_PAGE);

    const currentPage = params.page ? Number.parseInt(params.page[0], 10) : 1;

    const posts = pages[currentPage - 1];

    if (!posts) {
        throw new Error('Page not found');
    }

    return (
        <div className="mt-2">
            <h1 className="text-2xl font-extrabold">
                View all '{parseTag(params.tag)}'
            </h1>
            <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                {posts.map((post) => (
                    <li key={post.slug} className="w-full">
                        <BlogPostPreview post={post} />
                    </li>
                ))}
            </ul>
            <div className="mt-2">
                <PageButtons
                    alwaysShowFirst
                    current={currentPage}
                    total={pages.length}
                    hrefPrefix={`/tag/${params.tag}`}
                />
            </div>
        </div>
    );
};

export default page;
