'use client';

import clsx from 'clsx';
import { useState } from 'react';

import { CrossSVG, MagnifyingGlassSVG } from '../ClientIcons';
import { SearchBar } from './SearchBar';

export const SearchAnchor = () => {
    const [searchExpanded, setSearchExpanded] = useState(false);

    return (
        <div
            className="group z-30 flex flex-1 justify-between"
            id="search_system"
        >
            {searchExpanded && (
                <div
                    className="absolute inset-0 block h-screen bg-black/10 backdrop-blur-sm sm:hidden"
                    onClick={() => {
                        setSearchExpanded(true);
                    }}
                    onKeyDown={() => {}}
                    role="none"
                ></div>
            )}
            <div
                className={clsx(
                    'absolute inset-x-0 top-5 w-full sm:static sm:block',
                    searchExpanded ? 'block' : 'hidden'
                )}
            >
                <div className="w-full px-4 sm:px-0">
                    <SearchBar shouldFocus={searchExpanded} />
                </div>
            </div>
            <div className="text-ens-grey2 flex flex-1 items-center justify-end gap-2 sm:hidden">
                <button
                    onClick={(event) => {
                        setSearchExpanded(!searchExpanded);
                    }}
                    className={
                        'hover:bg-ens-grey2/20 flex items-center rounded-full p-2'
                    }
                    onKeyDown={() => {}}
                    aria-expanded={searchExpanded}
                >
                    {searchExpanded ? <CrossSVG /> : <MagnifyingGlassSVG />}
                </button>
            </div>
        </div>
    );
};
