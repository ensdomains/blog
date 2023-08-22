/* eslint-disable unicorn/no-nested-ternary */
'use client';

import { FC } from 'react';
import { FiLoader } from 'react-icons/fi';
import useSWR from 'swr';

import { SearchEntry } from './SearchEntry';
import { SearchHit } from './SearchHit';

type SearchResult = {
    estimatedTotalHits: number;
    hits: SearchEntry[];
    limit: number;
    offset: number;
    processingTimeMs: number;
};

const doSearch = async ([_, search]: [
    'search',
    string
]): Promise<SearchResult> => {
    if (search.length < 3) {
        throw new Error('Search query too short');
    }

    // @ts-ignore
    const result = await fetch(
        'https://search.v3x.systems/indexes/ens-blog/search',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization:
                    'Bearer b77dacb494c3272351784097847e34c59b22510b30aa0ed662f1e79e1df658a0',
            } as any,
            body: JSON.stringify({
                q: search,
                limit: 5,
                showMatchesPosition: true,
                attributesToCrop: [],
                // attributesToCrop: ['content'],
                attributesToRetrieve: [
                    'title',
                    'slug',
                    // 'description',
                    'authors',
                    'tags',
                ],
                cropLength: 10,
                attributesToHighlight: [],
                // attributesToHighlight: ['content', 'title'],
            }) as any,
        }
    );

    return result.json();
};

export const SearchResults: FC<{ query: string }> = ({ query }) => {
    const { data, isLoading } = useSWR<SearchResult>(
        ['search', query],
        doSearch,
        {
            keepPreviousData: true,
        }
    );

    const validQuery = query.length > 2;
    const hasResults = data?.hits?.length > 0;

    return (
        <div className="interest-within:block absolute inset-x-0 top-full z-10 hidden pt-2 sm:top-[74px] sm:mx-4 lg:top-full lg:mx-0">
            <div className="relative mx-auto w-full rounded-lg border bg-white sm:max-w-xl lg:max-w-full">
                {isLoading && (
                    <FiLoader className="absolute right-0 top-0 m-4 animate-spin" />
                )}
                {validQuery ? (
                    hasResults ? (
                        <div className="text-ens-grey2 flex flex-col">
                            {data?.hits?.map((hit) => (
                                <SearchHit key={hit.slug} hit={hit} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-ens-grey2 p-4">No results</div>
                    )
                ) : (
                    <div className="text-ens-grey2 p-4">Type to search</div>
                )}
            </div>
        </div>
    );
};
