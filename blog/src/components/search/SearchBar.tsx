'use client';

import { useRef, useState } from 'react';
import { FiSearch } from 'react-icons/fi';

import { SearchResults } from './SearchResults';

export const SearchBar = () => {
    const [query, setQuery] = useState('');
    const reference = useRef<HTMLInputElement>(null);

    return (
        <div className="relative">
            <div className="relative h-12">
                <div className="absolute flex h-full items-center pl-4">
                    <FiSearch focusable={false} />
                </div>
                <input
                    type="text"
                    className="focus:border-ens-blue focus:outline-ens-blue h-full w-full rounded-full border bg-white py-1 pl-12 pr-10 sm:w-80 md:w-screen md:max-w-sm lg:max-w-2xl"
                    placeholder="Search for a post"
                    id="search"
                    name="search"
                    autoComplete="off"
                    onChange={(event) => setQuery(event.target.value)}
                    ref={reference}
                />
            </div>
            <SearchResults query={query} />
        </div>
    );
};
