import Link from 'next/link';
import { FC } from 'react';
import useSWR from 'swr';

import { BlogPostMetadataPlus } from '@/lib/get_posts';

import { SearchEntry } from './SearchEntry';

const fetcher = (url) => fetch(url).then((r) => r.json());

export const SearchHit: FC<{ hit: SearchEntry }> = ({ hit }) => {
    const { data } = useSWR<BlogPostMetadataPlus>(
        '/metadata/' + hit.slug + '.json',
        fetcher
    );

    return (
        <Link
            href={`/post/${hit.slug}`}
            className="search-highlight flex items-center gap-4 border-b p-4 last:border-b-0 hover:bg-neutral-100"
        >
            <div className="hidden aspect-video h-20 lg:block">
                {data?.cover_thumb && (
                    <img
                        src={data.cover_thumb}
                        alt=""
                        className="aspect-video h-full w-full rounded-md object-cover"
                    />
                )}
            </div>
            <div className="flex flex-col">
                <span className="text-lg text-neutral-700">{hit.title}</span>
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-2">
                        {data?.authors?.map((author) => (
                            <img
                                src={
                                    'https://metadata.ens.domains/mainnet/avatar/' +
                                    author
                                }
                                alt={author}
                                className="border-ens-grey1 h-8 w-8 rounded-full border-2"
                            />
                        ))}
                    </div>
                    <div className="text-ens-grey3">
                        {data?.authors?.join(', ')}
                    </div>
                </div>
            </div>
        </Link>
    );
};
