import Link from 'next/link';
import { FC } from 'react';

import { SearchBar } from '../search/SearchBar';
import { HamburgerMenu } from './HamburgerMenu';
import { MobileSearchMenu } from './MobileSearchMenu';

export const Navbar: FC = () => {
    return (
        <div className="mt-5 flex w-full items-center justify-between pb-3 pt-5">
            <div className="flex items-center justify-start gap-4">
                <Link href="/">
                    <img
                        src="/icons/ens_logo_primary.svg"
                        alt="ENS Logo"
                        className="w-[104px]"
                    />
                </Link>
            </div>
            <div className="hidden sm:block">
                <SearchBar />
            </div>
            <div className="text-ens-grey2 flex items-center gap-2">
                <div className="hidden md:block">ENS Domains</div>
                <MobileSearchMenu />
                <HamburgerMenu />
            </div>
        </div>
    );
};
