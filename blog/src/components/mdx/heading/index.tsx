import { FC, PropsWithChildren } from 'react';

import { cx } from '@/lib/cx';

import { Anchor } from './Anchor';

export const Heading: FC<
    PropsWithChildren & {
        level?: 2 | 3 | 4 | 5 | 6;
        id: string;
        anchor?: boolean;
        className?: string;
    }
> = ({ level = 2, children, id, anchor = true, ...properties }) => {
    const Component = `h${level}` as any as FC<
        PropsWithChildren & { id: any; className: any }
    >;

    return (
        <>
            <Component
                id={anchor ? id : undefined}
                className={cx(
                    properties.className,
                    'mt-8 scroll-mt-16',
                    'flex justify-between items-center w-full'
                )}
                children={
                    (
                        <>
                            {anchor ? (
                                <Anchor id={id}>{children}</Anchor>
                            ) : (
                                children
                            )}
                        </>
                    ) as any
                }
                {...properties}
            />
        </>
    );
};
