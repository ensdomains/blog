/* eslint-disable sonarjs/no-duplicate-string */
import { ResolvingMetadata } from 'next';

import { PageButtons } from '@/components/PageButtons';
import { BlogPostPreview } from '@/components/PostPreview';
import { getPostsMetadata } from '@/lib/get_posts';
import { createMetadata } from '@/lib/metadata';
import { splitArray, splitArrayBiasFirst } from '@/lib/split_array';

const MAX_PER_PAGE = 6;

type PageProperties = {
    params: { page: string[] };
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
    const metas = await getPostsMetadata();
    const pages = splitArrayBiasFirst(metas, MAX_PER_PAGE);

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
                title: 'ENS Blog',
                description: 'The official blog of the Ethereum Name Service',
                url: 'https://blog.ens.domains',
                images: '/opengraph.jpg',
            },
            twitter: {
                title: 'ENS Blog',
                description: 'The official blog of the Ethereum Name Service',
                card: 'summary_large_image',
            },
        }
    );
};

const page = async ({ params }: PageProperties) => {
    const postsUnlimited = await getPostsMetadata();

    const pages = splitArrayBiasFirst(postsUnlimited, MAX_PER_PAGE);

    const currentPage = params.page ? Number.parseInt(params.page[0], 10) : 1;
    const isHomePage = currentPage === 1;

    const posts = pages[currentPage - 1];

    if (!posts) {
        throw new Error('Page not found');
    }

    return (
        <div className="mt-2">
            {isHomePage && (
                <div className="">
                    <span className="block p-4 text-3xl font-bold">
                        Newest article
                    </span>
                    <div className="mb-4 w-full">
                        <BlogPostPreview post={posts[0]} variant="horizontal" />
                    </div>
                </div>
            )}
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2">
                {posts.slice(isHomePage ? 1 : 0).map((post) => (
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
