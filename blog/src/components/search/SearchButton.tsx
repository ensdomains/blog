/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';

import { FC, PropsWithChildren } from 'react';

export const SearchButton: FC<
    PropsWithChildren<{ variant: 'open' | 'close'; className: string }>
> = ({ variant, className, children }) => {
    return (
        <label
            htmlFor="search_open"
            onClick={(event) => {
                event.preventDefault();
                const input = document.querySelector(
                    '#search_open'
                ) as HTMLInputElement;

                input.focus();
                input.checked = variant === 'open';
                input.setAttribute(
                    'checked',
                    variant === 'open' ? 'true' : 'false'
                );
                setTimeout(() => {
                    const input = document.querySelector(
                        '#search'
                    ) as HTMLInputElement;

                    input.focus();
                }, 50);
            }}
            className={className}
        >
            {children}
        </label>
    );
};
