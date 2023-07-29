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
                    'Bearer fbe212eee1d3d67c388a1dbc517b87a9eeb4b9267ec50021e03072ec322b56cf',
            } as any,
            body: JSON.stringify({
                q: search,
                limit: 5,
                showMatchesPosition: true,
                attributesToCrop: ['content'],
                attributesToRetrieve: ['title', 'slug'],
                cropLength: 10,
                attributesToHighlight: ['content', 'title'],
            }) as any,
        }
    );

    return result.json();
};

export const SearchResults: FC = () => {
    const [isFocused, setFocused] = useState(false);
    const [searchResults, setSearchResults] = useState<SearchResult>();
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');

    useEffect(() => {
        console.log('hooking');
        const field = document.querySelector('#search');

        if (!field) {
            return;
        }

        field.addEventListener('focus', () => {
            setFocused(true);
        });

        field.addEventListener('blur', () => {
            setFocused(false);
        });

        field.addEventListener('input', (event: InputEvent) => {
            const target: HTMLInputElement = event.target as HTMLInputElement;

            setQuery(target.value);
        });
        field.addEventListener('keydown', (event: KeyboardEvent) => {
            console.log('keydown', event.key);

            if (event.key === 'Escape') {
                console.log('escape');
            }

            if (event.key === 'Enter') {
                console.log('enter');
            }
        });
    }, []);

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

    if (!isFocused) return;

    const validQuery = query.length > 2;
    const hasResults = searchResults?.hits?.length > 0;

    return (
        <div className="absolute inset-x-0 top-full pt-2">
            <div className="rounded-lg border bg-white p-4">
                {loading && <div>Loading...</div>}
                {!loading && !validQuery && (
                    <div className="text-ens-grey2">Type to search</div>
                )}
                {!loading && validQuery && !hasResults && (
                    <div className="text-ens-grey2">No results</div>
                )}
                {!loading && validQuery && hasResults && (
                    <div className="text-ens-grey2">
                        {searchResults?.hits?.map((hit) => (
                            <div key={hit.slug}>
                                <Link
                                    href={`/${hit.slug}`}
                                    className="hover:text-ens-blue search-highlight"
                                >
                                    <img src="" alt="" />
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: hit._formatted.title,
                                        }}
                                    ></div>
                                    <div
                                        dangerouslySetInnerHTML={{
                                            __html: hit._formatted.description,
                                        }}
                                    ></div>
                                    <div>
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
