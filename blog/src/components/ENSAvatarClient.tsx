'use client';

import { FC } from 'react';
import { FiUser } from 'react-icons/fi';
import { useQuery } from 'react-query';

import { cx } from '@/lib/cx';

type ENStateResponse = {
    name: string;
    address: string;
    avatar: string;
    display: string;
};

type Size = 'small' | 'medium' | 'large';

export const ENSAvatarClient: FC<{ name: string; size?: Size }> = ({
    name,
    size = 'medium',
}) => {
    const getEnsState = useQuery([`enstate-for-${name}`], async () => {
        const response = await fetch('https://enstate.rs/n/' + name);
        const data: ENStateResponse | undefined = await response
            .json()
            .then((data) => data)
            .catch((error) => {
                console.error(error);
            });

        const ensUrl =
            data.avatar ??
            `https://metadata.ens.domains/mainnet/avatar/${name}`;

        let metaDataFailed: boolean = false;

        if (!data.avatar) {
            const metadataResponse = await fetch(ensUrl, { method: 'HEAD' });

            metaDataFailed = metadataResponse.status !== 200;
        }

        return {
            avatar: {
                ensUrl,
                failed: metaDataFailed,
            },
            data,
        };
    });

    if (!getEnsState?.data?.data.avatar || getEnsState.data.avatar.failed) {
        return (
            <div
                className={cx(
                    'flex aspect-square items-center justify-center rounded-full text-white',
                    size === 'small'
                        ? 'h-6 w-6'
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

    return (
        <img
            src={getEnsState?.data.data.avatar}
            alt={name}
            className={cx(
                'aspect-square rounded-full bg-white',
                size === 'small'
                    ? 'h-6 w-6'
                    : // eslint-disable-next-line unicorn/no-nested-ternary
                    size === 'medium'
                    ? 'h-8 w-8'
                    : 'h-12 w-12'
            )}
        />
    );
};
