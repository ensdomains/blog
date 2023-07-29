import Link from 'next/link';
import { FC } from 'react';

import { MenuButton } from './MenuButton';

export const Navbar: FC = () => {
    return (
        <div className="mt-5 flex w-full items-center justify-between pb-3 pt-5">
            <Link href="/">
                <img
                    src="/icons/ens_logo_primary.svg"
                    alt="ENS Logo"
                    className="w-[104px]"
                />
            </Link>
            <div className="text-ens-grey2 flex items-center gap-2">
                <div>ENS Domains</div>
                <div className="text-ens-grey2 fill-ens-grey2">
                    <MenuButton />
                </div>
            </div>
        </div>
    );
};
