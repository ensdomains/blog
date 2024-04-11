import 'server-only';

import { avatars } from 'assets/assets';
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
    let avatar = avatars[name as keyof typeof avatars]
        ? await avatars[name as keyof typeof avatars].avatar.then(
              (imported) => imported.default.src
          )
        : undefined;

    if (!avatar) {
        const response = await fetch('https://enstate.rs/n/' + name);

        const data: ENStateResponse | undefined =
            response.status === 200 ? await response.json() : undefined;

        if (response.status != 200) {
            console.error('Enstate silently errored', response.body);
        }

        avatar = data?.avatar;
    }

    if (!avatar) {
        const metadataResponse = await fetch(
            `https://metadata.ens.domains/mainnet/avatar/${name}`,
            { method: 'HEAD' }
        );

        if (metadataResponse.status !== 200) {
            return (
                <div
                    className={cx(
                        'flex aspect-square items-center justify-center rounded-full text-white',
                        size === 'small'
                            ? 'h-6 w-6'
                            : // eslint-disable-next-line unicorn/no-nested-ternary
                            size === 'medium'
                            ? 'h-8 w-8'
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

        avatar = `https://metadata.ens.domains/mainnet/avatar/${name}`;
    }

    return (
        <img
            src={avatar}
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
