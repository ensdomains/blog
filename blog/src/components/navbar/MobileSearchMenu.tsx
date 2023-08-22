'use client';

import { Card, CrossSVG, MagnifyingGlassSVG } from '@ensdomains/thorin';
import { useState } from 'react';

import { SearchBar } from '../search/SearchBar';

export const MobileSearchMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="sm:hidden">
            <div className="text-ens-grey2 fill-ens-grey2">
                <button
                    className="hover:bg-ens-grey2/20 flex items-center rounded-full p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <CrossSVG /> : <MagnifyingGlassSVG />}
                </button>
            </div>
            {isOpen && (
                <div className="absolute left-0 top-20 block w-full  md:hidden">
                    <Card className="w-full !gap-0 !rounded-none !px-2">
                        <SearchBar />
                    </Card>
                </div>
            )}
        </div>
    );
};
