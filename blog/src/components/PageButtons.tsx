import Link from 'next/link';
import { HTMLAttributes } from 'react';

type NativeDivProperties = HTMLAttributes<HTMLDivElement>;

type Size = 'small' | 'medium';

type Properties = {
    /** Total number of pages */
    total: number;
    current: number;
    /** Maximum number of buttons to show */
    max?: number;
    size?: Size;
    alwaysShowFirst?: boolean;
    alwaysShowLast?: boolean;
    showEllipsis?: boolean;
} & Omit<NativeDivProperties, 'children' | 'onChange'>;

enum Marker {
    ellipsis = -1,
}

/**
 * Temporary tailwind copy of PageButtons component from thorin pending proper styled components implementation
 */
export const PageButtons = ({
    total,
    current,
    max = 5,
    size = 'medium',
    alwaysShowFirst,
    alwaysShowLast,
    showEllipsis = true,
    ...properties
}: Properties) => {
    const maxPerSide = Math.floor(max / 2);
    const start = Math.max(
        Math.min(Math.max(current - maxPerSide, 1), total - max + 1),
        1
    );
    const pageNumbers = Array.from(
        { length: max },
        (_, index) => start + index
    ).filter((x) => x <= total);

    if (total > max) {
        if (alwaysShowFirst && start > 1) {
            if (showEllipsis) {
                pageNumbers[0] = Marker.ellipsis;
                pageNumbers.unshift(1);
            } else {
                pageNumbers[0] = 1;
            }
        } else if (showEllipsis && start > 1) {
            pageNumbers.unshift(Marker.ellipsis);
        }

        if (alwaysShowLast && total > current + maxPerSide) {
            if (showEllipsis) {
                pageNumbers[pageNumbers.length - 1] = Marker.ellipsis;
                pageNumbers.push(total);
            } else {
                pageNumbers[pageNumbers.length - 1] = total;
            }
        } else if (showEllipsis && total > current + maxPerSide) {
            pageNumbers.push(Marker.ellipsis);
        }
    }

    return (
        <div
            className="flex-gap-2 flex flex-row items-center justify-center gap-2"
            {...properties}
        >
            {pageNumbers.map((value, index) =>
                value === Marker.ellipsis ? (
                    <p
                        data-testid="pagebutton-dots"
                        key={`${value}-${index}`}
                        className="text-sm font-bold text-gray-500"
                    >
                        ...
                    </p>
                ) : (
                    <Link
                        className={`
                        min-w-10 h-10 cursor-pointer rounded-full border border-gray-300 p-2 font-bold transition-all duration-150
                        ${
                            value === current
                                ? 'text-accent pointer-events-none cursor-default'
                                : 'cursor-pointer text-gray-400 hover:bg-gray-200'
                        } ${
                            size === 'small'
                                ? 'leading-sm min-w-9 h-9 rounded-sm text-sm'
                                : 'leading-base rounded-extraLarge min-w-10 h-10 text-base'
                        }`}
                        data-testid="pagebutton"
                        key={value}
                        type="button"
                        href={`${value}`}
                    >
                        {value}
                    </Link>
                )
            )}
        </div>
    );
};
