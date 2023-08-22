import Link from 'next/link';
import { FC } from 'react';

import { SearchAnchor } from '../search/SearchAnchor';
import { HamburgerMenu } from './HamburgerMenu';

export const Navbar: FC = () => {
    return (
        <div className="flex flex-1 items-center justify-start gap-4 px-6 pb-3 pt-5">
            <Link href="/">
                <img
                    src="/icons/ens_logo_primary.svg"
                    alt="ENS Logo"
                    className="w-[104px] min-w-[104px]"
                />
            </Link>
            <HamburgerMenu />
            <SearchAnchor />
        </div>
    );
};
