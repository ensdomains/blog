'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export const AutoCloseSearch = () => {
    const pathname = usePathname();

    useEffect(() => {
        document
            .querySelector('#search_open')
            ?.setAttribute('checked', 'false');

        const { activeElement } = document;
        const searchSystem = document.querySelector('#search_system');

        if (activeElement && searchSystem.contains(activeElement)) {
            activeElement['blur']?.();
        }
    }, [pathname]);

    return <></>;
};
