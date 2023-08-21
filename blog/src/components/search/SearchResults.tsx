'use client';

import { FC, useEffect, useState } from 'react';

import { SearchEntry } from './SearchEntry';
import { SearchHit } from './SearchHit';

type SearchResult = {
    estimatedTotalHits: number;
    hits: SearchEntry[];
    limit: number;
    offset: number;
    processingTimeMs: number;
};

const doSearch = async (search: string): Promise<SearchResult> => {
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
    const [searchResults, setSearchResults] = useState<SearchResult>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const validQuery = query.length > 2;

        if (!validQuery) {
            setLoading(false);

            return;
        }

        setLoading(true);

        doSearch(query).then((results) => {
            setLoading(false);
            setSearchResults(results);
        });
    }, [query]);

    const validQuery = query.length > 2;
    const hasResults = searchResults?.hits?.length > 0;

    return (
        <div className="absolute inset-x-0 top-full z-10 hidden pt-2 group-focus-within:block">
            <div className="rounded-lg border bg-white">
                {loading && <div className="p-4">Loading...</div>}
                {!loading && !validQuery && (
                    <div className="text-ens-grey2 p-4">Type to search</div>
                )}
                {!loading && validQuery && !hasResults && (
                    <div className="text-ens-grey2 p-4">No results</div>
                )}
                {!loading && validQuery && hasResults && (
                    <div className="text-ens-grey2 flex flex-col">
                        {searchResults?.hits?.map((hit) => (
                            <SearchHit key={hit.slug} hit={hit} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
