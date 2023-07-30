'use client';

import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

type MatchesPosition = { start: number; length: number }[];

type SearchEntry = {
    slug: string;
    title: string;
    description: string;
    _formatted: {
        content: string;
        slug: string;
        title: string;
        description: string;
    };
    _matchesPosition: {
        content: MatchesPosition;
        slug: MatchesPosition;
        title: MatchesPosition;
        description: MatchesPosition;
    };
};

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
                    'Bearer 881ba3430f3bdf912045bd7c462a32a90fd7e26d9c6fd992a6a358cedcd97013',
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
            <div className="rounded-lg border bg-white p-4">
                {loading && <div>Loading...</div>}
                {!loading && !validQuery && (
                    <div className="text-ens-grey2">Type to search</div>
                )}
                {!loading && validQuery && !hasResults && (
                    <div className="text-ens-grey2">No results</div>
                )}
                {!loading && validQuery && hasResults && (
                    <div className="text-ens-grey2 flex flex-col gap-1">
                        {searchResults?.hits?.map((hit) => (
                            <div key={hit.slug}>
                                <Link
                                    href={`/${hit.slug}`}
                                    className="search-highlight flex flex-col p-2 hover:bg-neutral-100"
                                >
                                    <img src="" alt="" />
                                    <span
                                        className="text-lg text-neutral-700"
                                        dangerouslySetInnerHTML={{
                                            __html: hit._formatted.title,
                                        }}
                                    />
                                    <span
                                        dangerouslySetInnerHTML={{
                                            __html: hit._formatted.description,
                                        }}
                                    ></span>
                                    <div className="mt-3">
                                        {
                                            <img
                                                src="https://metadata.ens.domains/mainnet/avatar/luc.eth"
                                                alt=""
                                                className="h-4 w-4 rounded-full"
                                            />
                                        }
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
