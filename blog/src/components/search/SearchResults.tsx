'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
    FC,
    forwardRef,
    useEffect,
    useImperativeHandle,
    useState,
} from 'react';
import { useQuery } from 'react-query';

import { cx } from '@/lib/cx';

import { ENSAvatarClient } from '../ENSAvatarClient';

type MatchesPosition = { start: number; length: number }[];

type SearchEntry = {
    slug: string;
    title: string;
    description: string;
    authors: string[];
    file: string;
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
                    'file',
                ],
                cropLength: 10,
                attributesToHighlight: ['content', 'title'],
            }) as any,
        }
    );

    return result.json();
};

export const SearchHit: FC<{
    hit: SearchEntry;
    hasBottomSeparator?: boolean;
    coverImage?: string;
    selected?: boolean;
    resetSelection: () => void;
}> = ({ hit, hasBottomSeparator, coverImage, selected, resetSelection }) => {
    const to = `/post/${hit.slug}`;

    return (
        <Link
            href={to}
            className={cx(
                'search-highlight flex gap-5 items-center p-4 hover:bg-neutral-100',
                selected && 'bg-neutral-100',
                hasBottomSeparator && 'border-b'
            )}
            onMouseOver={() => {
                resetSelection();
            }}
            tabIndex={-1}
        >
            <div
                className="hidden aspect-video w-32 min-w-[8rem] overflow-hidden rounded-lg lg:block"
                style={{
                    background:
                        'linear-gradient(330.4deg, #44BCF0 4.54%, #7298F8 59.2%, #A099FF 148.85%)',
                }}
            >
                {coverImage && (
                    <Image
                        alt={'Post'}
                        width="200"
                        height={(1080 / 1920) * 200}
                        className="w-full"
                        priority
                        src={coverImage}
                    />
                )}
            </div>

            <div className="flex flex-col">
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
                                <ENSAvatarClient
                                    key={`author_${author}_${hit.slug}`}
                                    name={author}
                                    size="small"
                                />
                            ))}
                        </span>
                        <span>{hit.authors.join(', ')}</span>
                    </span>
                </span>
            </div>
        </Link>
    );
};

export type SearchResultsReference = {
    selectUp: () => void;
    selectDown: () => void;
    resetSelection: () => void;
    navigateCurrent: () => void;
};

export const SearchResults = forwardRef<
    SearchResultsReference,
    { query: string }
    // eslint-disable-next-line sonarjs/cognitive-complexity
>(({ query }, reference) => {
    const router = useRouter();

    const [searchResults, setSearchResults] = useState<SearchResult>();

    const [loading, setLoading] = useState(false);

    const [selectedIndex, setSelectedIndex] = useState<number>();

    const resetSelection = () => {
        // eslint-disable-next-line unicorn/no-useless-undefined
        setSelectedIndex(undefined);
    };

    useImperativeHandle(
        reference,
        () =>
            ({
                selectUp: () => {
                    if (selectedIndex !== undefined) {
                        if (selectedIndex - 1 < 0) {
                            // eslint-disable-next-line unicorn/no-useless-undefined
                            setSelectedIndex(undefined);
                        } else {
                            setSelectedIndex(selectedIndex - 1);
                        }
                    }
                },
                selectDown: () => {
                    if (
                        selectedIndex == undefined ||
                        selectedIndex + 1 >= searchResults.hits.length
                    ) {
                        setSelectedIndex(0);
                    } else {
                        setSelectedIndex(selectedIndex + 1);
                    }
                },
                resetSelection,
                navigateCurrent: () => {
                    const hit = searchResults.hits[selectedIndex];

                    if (!hit) return;

                    const to = `/post/${hit.slug}`;

                    router.push(to);
                },
            } satisfies SearchResultsReference)
    );

    useEffect(() => {
        const validQuery = query.length > 2;

        if (!validQuery) {
            setLoading(false);

            return;
        }

        setLoading(true);

        resetSelection();

        doSearch(query).then((results) => {
            setLoading(false);
            setSearchResults(results);
        });
    }, [query]);

    const validQuery = query.length > 2;
    const hasResults = searchResults?.hits?.length > 0;

    const coverImages = useQuery(['cover_images'], async () => {
        const result = await fetch('/covers.json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const json = await result.json();

        return json as {
            [slug: string]: string;
        };
    });

    return (
        <div className="absolute inset-x-0 top-full z-10 hidden pt-2 group-focus-within:block">
            <div className="rounded-lg border bg-white">
                {loading && <div className="p-4">Loading...</div>}
                {!loading && !validQuery && (
                    <div className="text-ens-grey2 p-4">Type to search</div>
                )}
                {!loading && validQuery && !hasResults && (
                    <div className="text-ens- p-4">No results</div>
                )}

                {!loading && validQuery && hasResults && (
                    <>
                        {coverImages.isFetching ? (
                            <div className="p-4">Loading...</div>
                        ) : (
                            <div className="text-ens-grey2 flex flex-col">
                                {searchResults?.hits?.map((hit, index) => (
                                    <SearchHit
                                        key={`search_result_${hit.slug}`}
                                        hit={hit}
                                        hasBottomSeparator={
                                            index !==
                                            searchResults?.hits.length - 1
                                        }
                                        selected={index == selectedIndex}
                                        coverImage={coverImages.data[hit.file]}
                                        resetSelection={resetSelection}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
});
