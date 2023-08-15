import { ResolvingMetadata } from 'next';

import { PageButtons } from '@/components/PageButtons';
import { BlogPostPreview } from '@/components/PostPreview';
import { getPostsMetadata } from '@/lib/get_posts';
import { createMetadata } from '@/lib/metadata';
import { splitArray } from '@/lib/split_array';

const MAX_PER_PAGE = 6;

type PageProperties = {
    params: { page: string[] };
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
    const metas = await getPostsMetadata();
    const pages = splitArray(metas, MAX_PER_PAGE);

    const parameters: PageProperties['params'][] = pages.map((_, index) => ({
        page: [(index + 1).toString()],
    }));

    parameters[0] = { page: [''] };

    return parameters;
}

export const generateMetadata = async (
    { params }: PageProperties,
    parent: ResolvingMetadata
) => {
    const parentMetadata = await parent;

    return createMetadata(
        {
            title: 'ENS Blog',
            description: 'The official blog of the Ethereum Name Service',
            path: '/',
        },
        parentMetadata,
        {
            openGraph: {
                type: 'website',
                // title: post.title,
                // authors: post.authors?.map((author) => author),
                images: '/opengraph.jpg',
                // description: post.description,
                // tags: post.tags,
            },
            twitter: {
                card: 'summary_large_image',
            },
        }
    );
};

const page = async ({ params }: PageProperties) => {
    const postsUnlimited = await getPostsMetadata();

    const pages = splitArray(postsUnlimited, MAX_PER_PAGE);

    const currentPage = params.page ? Number.parseInt(params.page[0], 10) : 1;

    const posts = pages[currentPage - 1];

    if (!posts) {
        throw new Error('Page not found');
    }

    return (
        <div className="mt-2">
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2">
                {posts.map((post) => (
                    <li key={post.slug} className="w-full">
                        <BlogPostPreview post={post} />
                    </li>
                ))}
            </ul>
            <div className="mt-4">
                <PageButtons
                    alwaysShowFirst
                    current={currentPage}
                    total={pages.length}
                />
            </div>
        </div>
    );
};

export default page;
