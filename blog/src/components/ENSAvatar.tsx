'server-only';

import { FC } from 'react';
import { FiUser } from 'react-icons/fi';

import { cx } from '@/lib/cx';

type ENStateResponse = {
    name: string;
    address: string;
    avatar: string;
    display: string;
};

type Size = 'small' | 'medium' | 'large';

export const ENSAvatar: FC<{ name: string; size?: Size }> = async ({
    name,
    size = 'medium',
}) => {
    const response = await fetch('https://enstate.rs/n/' + name);
    const data: ENStateResponse | undefined = await response
        .json()
        .then((data) => data)
        .catch((error) => {
            console.error(error);
        });
    const ensUrl =
        data?.avatar || `https://metadata.ens.domains/mainnet/avatar/${name}`;

    if (!data?.avatar) {
        const metadataResponse = await fetch(ensUrl, { method: 'HEAD' });

        if (metadataResponse.status !== 200) {
            return (
                <div
                    className={cx(
                        'flex aspect-square items-center justify-center rounded-full text-white',
                        size === 'small'
                            ? 'h-3 w-3'
                            : // eslint-disable-next-line unicorn/no-nested-ternary
                            size === 'medium'
                            ? 'h-8 w-6'
                            : 'h-12 w-12'
                    )}
                    style={{
                        background:
                            'linear-gradient(330.4deg, #44BCF0 4.54%, #7298F8 59.2%, #A099FF 148.85%)',
                    }}
                >
                    <FiUser />
                </div>
            );
        }
    }

    return (
        <img
            src={ensUrl}
            alt={name}
            className="aspect-square h-8 w-8 rounded-full bg-white"
        />
    );
};
