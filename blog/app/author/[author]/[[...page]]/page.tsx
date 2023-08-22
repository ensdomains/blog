/* eslint-disable sonarjs/no-duplicate-string */
/* eslint-disable sonarjs/no-nested-template-literals */
import { ResolvingMetadata } from 'next';
import Link from 'next/link';
import { ReactElement } from 'react';
import { FaDiscord, FaTelegram } from 'react-icons/fa';
import { FiGithub, FiGlobe, FiMail, FiTwitter } from 'react-icons/fi';

import { PageButtons } from '@/components/PageButtons';
import { BlogPostPreview } from '@/components/PostPreview';
import { getAuthorMetadata } from '@/lib/get_author_metadata';
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
            title: `${params.author}'s articles | ENS Blog`,
            description: 'The official blog of the Ethereum Name Service',
            path: `/author/${params.author}${
                params.page ? `/${params.page.join('/')}` : ''
            }`,
        },
        parentMetadata,
        {
            openGraph: {
                type: 'profile',
                images: '/opengraph.jpg',
                title: `${params.author}'s articles | ENS Blog`,
                description: 'The official blog of the Ethereum Name Service',
                url: `/author/${params.author}${
                    params.page ? `/${params.page.join('/')}` : ''
                }`,
                siteName: 'ENS Blog',
                username: params.author,
            },
            twitter: {
                title: `${params.author}'s articles | ENS Blog`,
                description: 'The official blog of the Ethereum Name Service',
                card: 'summary_large_image',
            },
        }
    );
};

const page = async ({ params }: PageProperties) => {
    const authors = await getAuthors();

    const postsUnlimited = authors[params.author];

    if (!postsUnlimited) throw new Error('Author not found');

    const author_metadata = await getAuthorMetadata(params.author);

    const pages = splitArray(postsUnlimited, MAX_PER_PAGE);

    const currentPage = params.page ? Number.parseInt(params.page[0], 10) : 1;

    const posts = pages[currentPage - 1];

    if (!posts) {
        throw new Error('Page not found');
    }

    return (
        <div className="mt-2">
            <h1 className="mb-4 text-3xl font-extrabold">
                {params.author}’s articles
            </h1>
            <div className="flex rounded-lg bg-white p-2">
                <div className="aspect-square h-full w-32 sm:w-48">
                    <img
                        src={
                            'https://metadata.ens.domains/mainnet/avatar/' +
                            params.author
                        }
                        alt={params.author}
                        className="rounded-lg"
                    />
                </div>
                <div className="flex flex-1 flex-col justify-between p-4 sm:flex-row">
                    <div className="flex flex-col justify-center gap-1">
                        <div className="text-2xl font-bold">
                            {params.author}
                        </div>

                        {author_metadata?.records.description && (
                            <div>{author_metadata.records.description}</div>
                        )}

                        {params.author.endsWith('.eth') && (
                            <div>{params.author + '.link'}</div>
                        )}
                    </div>
                    <div className="flex gap-2 text-xl">
                        {(
                            [
                                [
                                    'com.twitter',
                                    author_metadata.records['com.twitter'],
                                    <FiTwitter />,
                                ],
                                [
                                    'email',
                                    `mailto:${author_metadata.records.email}`,
                                    <FiMail />,
                                ],
                                [
                                    'org.telegram',
                                    author_metadata.records['org.telegram'],
                                    <FaTelegram />,
                                ],
                                [
                                    'url',
                                    author_metadata.records.url,
                                    <FiGlobe />,
                                ],
                                [
                                    'com.github',
                                    author_metadata.records['com.github'],
                                    <FiGithub />,
                                ],
                                [
                                    'com.discord',
                                    author_metadata.records['com.discord'],
                                    <FaDiscord />,
                                ],
                            ] as [
                                keyof typeof author_metadata.records,
                                string,
                                ReactElement
                            ][]
                        )
                            .filter(
                                ([record, url, _element]) =>
                                    author_metadata.records[record] && !!url
                            )
                            .map(([record, url, element]) => (
                                <Link
                                    href={url}
                                    key={record}
                                    className="hover:text-ens-blue"
                                >
                                    {element}
                                </Link>
                            ))}
                    </div>
                </div>
            </div>
            <ul className="mt-6 grid grid-cols-1 gap-2 sm:grid-cols-2">
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
