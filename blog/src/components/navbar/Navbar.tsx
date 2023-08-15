import Link from 'next/link';
import { FC } from 'react';

import { SearchBar } from '../search/SearchBar';
import { HamburgerMenu } from './HamburgerMenu';
import { MobileSearchMenu } from './MobileSearchMenu';

export const Navbar: FC = () => {
    return (
        <div className="flex w-full items-center px-6 pb-3 pt-5">
            <div className="flex flex-1 items-center justify-start gap-4">
                <Link href="/">
                    <img
                        src="/icons/ens_logo_primary.svg"
                        alt="ENS Logo"
                        className="w-[104px] min-w-[104px]"
                    />
                </Link>
                <HamburgerMenu />
                <div className="hidden sm:block">
                    <SearchBar />
                </div>
            </div>
            <div className="text-ens-grey2 flex flex-1 items-center justify-end gap-2">
                <MobileSearchMenu />
            </div>
        </div>
    );
};
