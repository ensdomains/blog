'use client';

import { useEffect } from 'react';

const updateSearch = (event: KeyboardEvent) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault();

        const all_highlight = document.querySelectorAll('.search-highlight');

        // Get the index of the current active ".search-highlight" element, if none, -1
        const index = Array.from(all_highlight).indexOf(document.activeElement);

        // Calculate the next Element
        const nIndex =
            event.key === 'ArrowUp'
                ? Math.max(-1, Math.min(index - 1, all_highlight.length - 1))
                : Math.min(all_highlight.length - 1, index + 1);

        // Focus the next element
        if (nIndex >= 0) all_highlight[nIndex]?.['focus']?.();
        else document.querySelector('#search')?.['focus']?.();
    }
};

const globalSearch = (event: KeyboardEvent) => {
    // If the user is pressing ctrl + k, alt + k, or meta + k, or simply '/'
    if (
        ((event.ctrlKey || event.metaKey || event.altKey) &&
            event.key.toLowerCase() === 'k') ||
        (event.key === '/' && !event.metaKey && !event.ctrlKey && !event.altKey)
    ) {
        if (
            event.key === '/' &&
            document.activeElement instanceof HTMLInputElement
        ) {
            return;
        }

        event.preventDefault();
        const input = document.querySelector(
            '#search_open'
        ) as HTMLInputElement;

        input.focus();
        input.checked = true;
        input.setAttribute('checked', 'true');
        setTimeout(() => {
            const input2 = document.querySelector(
                '#search'
            ) as HTMLInputElement;

            input2.focus();

            setTimeout(() => {
                input.checked = false;
                input.setAttribute('checked', 'false');
            }, 50);
        }, 50);
    }
};

export const KeyboardNavigation = () => {
    useEffect(() => {
        const searchSystem = document.querySelector('#search_system');

        searchSystem?.addEventListener('keydown', updateSearch);
        window.addEventListener('keydown', globalSearch);

        return () => {
            searchSystem?.removeEventListener('keydown', updateSearch);
            window.removeEventListener('keydown', globalSearch);
        };
    }, []);

    return <></>;
};
