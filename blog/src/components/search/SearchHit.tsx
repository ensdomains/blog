import { Metadata } from 'app/metadata/[slug]/route';
import Link from 'next/link';
import { FC } from 'react';
import useSWR from 'swr';

import { SearchEntry } from './SearchEntry';

const fetcher = (url) => fetch(url).then((r) => r.json());

export const SearchHit: FC<{ hit: SearchEntry }> = ({ hit }) => {
    const { data } = useSWR<Metadata>(
        '/metadata/' + hit.slug + '.json',
        fetcher
    );

    return (
        <Link
            href={`/post/${hit.slug}`}
            className="search-highlight hover:bg-ens-grey1 outline-ens-blue flex items-center gap-4 border-b p-4 first:rounded-t-lg last:rounded-b-lg last:border-b-0"
        >
            <div className="hidden aspect-video h-20 lg:block">
                {data?.assets.covers['cover-thumb'] && (
                    <img
                        src={data?.assets.covers['cover-thumb']}
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
                                    data?.assets.avatars[author]?.['avatar'] ||
                                    `https://metadata.ens.domains/mainnet/avatar/${author}`
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
