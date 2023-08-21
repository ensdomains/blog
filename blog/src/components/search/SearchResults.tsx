'use client';

import { FC, ReactElement } from 'react';
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
                attributesToCrop: ['content'],
                attributesToRetrieve: [
                    'title',
                    'slug',
                    'description',
                    'authors',
                    'tags',
                ],
                cropLength: 10,
                attributesToHighlight: ['content', 'title'],
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

    let state: ReactElement<any, any>;

    const results = (
        <div className="text-ens-grey2 flex flex-col">
            {data?.hits?.map((hit) => (
                <SearchHit key={hit.slug} hit={hit} />
            ))}
        </div>
    );

    if (validQuery) {
        if (isLoading) {
            if (!hasResults) {
                state = <div className="p-4">Loading...</div>;
            }
        } else {
            state = hasResults ? (
                results
            ) : (
                <div className="text-ens-grey2 p-4">No results</div>
            );
        }
    } else {
        state = hasResults ? (
            results
        ) : (
            <div className="text-ens-grey2 p-4">Type to search</div>
        );
    }

    return (
        <div className="absolute inset-x-0 top-full z-10 hidden pt-2 group-focus-within:block">
            <div className="rounded-lg border bg-white">{state}</div>
        </div>
    );
};
