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
            <div className="aspect-video h-20">
                {data?.cover_thumb && (
                    <img
                        src={data.cover_thumb}
                        alt=""
                        className="aspect-video h-full w-full rounded-md object-cover"
                    />
                )}
            </div>
            <div className="flex flex-col">
                <span
                    className="text-lg text-neutral-700"
                    dangerouslySetInnerHTML={{
                        __html: hit._formatted.title,
                    }}
                />
                <div className="mt-3">
                    {
                        <img
                            src="https://metadata.ens.domains/mainnet/avatar/luc.eth"
                            alt=""
                            className="h-4 w-4 rounded-full"
                        />
                    }
                </div>
            </div>
        </Link>
    );
};
