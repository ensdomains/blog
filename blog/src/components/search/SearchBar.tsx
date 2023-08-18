'use client';

import { useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import { SearchResults, SearchResultsReference } from './SearchResults';

export const SearchBar = () => {
    const [query, setQuery] = useState('');
    const reference = useRef<HTMLInputElement>(null);

    const searchResultsReference = useRef<SearchResultsReference>();

    return (
        <div className="group relative w-full max-w-[38rem]">
            <div className="relative h-12 w-full">
                <div className="absolute flex h-full items-center pl-4">
                    <FiSearch focusable={false} />
                </div>
                <input
                    type="search"
                    className="focus:border-ens-blue focus:outline-ens-blue h-full w-full rounded-full border bg-white py-1 pl-12 pr-10 "
                    placeholder="Search for a post"
                    id="search"
                    autoComplete="off"
                    onChange={(event) => setQuery(event.target.value)}
                    ref={reference}
                    onBlur={() => {
                        searchResultsReference.current.resetSelection();
                    }}
                    onKeyDown={(event) => {
                        if (event.key == 'ArrowDown') {
                            event.preventDefault();
                            searchResultsReference.current.selectDown();
                        } else if (event.key == 'ArrowUp') {
                            event.preventDefault();
                            searchResultsReference.current.selectUp();
                        } else if (event.key == 'Enter') {
                            event.preventDefault();
                            searchResultsReference.current.navigateCurrent();
                        }
                    }}
                />
            </div>

            <SearchResults query={query} ref={searchResultsReference} />
        </div>
    );
};
