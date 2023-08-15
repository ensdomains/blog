import { ResolvingMetadata } from 'next';

import { PageButtons } from '@/components/PageButtons';
import { BlogPostPreview } from '@/components/PostPreview';
import { getAuthors } from '@/lib/get_authors';
import { createMetadata } from '@/lib/metadata';
import { splitArray } from '@/lib/split_array';

const MAX_PER_PAGE = 6;

type PageProperties = {
    params: { author: string; page: string[] };
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams(): Promise<
    PageProperties['params'][]
> {
    const authors = await getAuthors();

    return Object.entries(authors).flatMap(([author, posts]) => {
        const pages = splitArray(posts, MAX_PER_PAGE);

        return pages.map((_, index) => ({
            author,
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
    const authors = await getAuthors();

    const postsUnlimited = authors[params.author];

    if (!postsUnlimited) throw new Error('Author not found');

    const pages = splitArray(postsUnlimited, MAX_PER_PAGE);

    const currentPage = params.page ? Number.parseInt(params.page[0], 10) : 1;

    const posts = pages[currentPage - 1];

    if (!posts) {
        throw new Error('Page not found');
    }

    return (
        <div className="mt-2">
            <h1 className="text-2xl font-extrabold">
                {params.author}’s articles
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
                    hrefPrefix={`/author/${params.author}`}
                />
            </div>
        </div>
    );
};

export default page;