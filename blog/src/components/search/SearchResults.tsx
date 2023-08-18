'use client';

import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

import { ENSAvatarClient } from '../ENSAvatarClient';

type MatchesPosition = { start: number; length: number }[];

type SearchEntry = {
    slug: string;
    title: string;
    description: string;
    authors: string[];
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

export const SearchHit: FC<{ hit: SearchEntry; onDown: () => void }> = ({
    hit,
}) => {
    return (
        <div key={hit.slug}>
            <Link
                href={`/post/${hit.slug}`}
                className="search-highlight flex flex-col p-2 hover:bg-neutral-100"
                onKeyDown={(event) => {
                    // if (event.key == 'ArrowDown') {
                    //     const newIndex = currentPageIndex + 1;
                    //     const link = links[newIndex];
                    //     if (link == undefined) return;
                    //     setCurrentPageIndex(newIndex);
                    //     Router.push(link.path);
                    // } else if (event.key == 'ArrowUp') {
                    //     const newIndex = currentPageIndex - 1;
                    //     const link = links[newIndex];
                    //     if (link == undefined) return;
                    //     setCurrentPageIndex(newIndex);
                    //     Router.push(link.path);
                    // }
                }}
            >
                <img src="" alt="" />

                <span
                    className="mb-3 text-lg text-neutral-700"
                    dangerouslySetInnerHTML={{
                        __html: hit._formatted.title,
                    }}
                />
                <span className="flex w-full items-end justify-between">
                    <span className="flex items-center gap-2">
                        <span className="flex -space-x-2">
                            {hit.authors.map((author) => (
                                <ENSAvatarClient name={author} size="small" />
                            ))}
                        </span>
                        <span>{hit.authors.join(', ')}</span>
                    </span>
                </span>
            </Link>
        </div>
    );
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
        <div className="absolute inset-x-0 top-full z-10 block pt-2 ">
            {/* group-focus-within:block */}
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
                            <SearchHit hit={hit} onDown={() => {}} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
