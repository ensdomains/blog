/* eslint-disable sonarjs/no-duplicate-string */
import { avatars } from 'assets/assets';
import { formatRecord } from 'ens-tools/dist/format';
import Link from 'next/link';
import { FC } from 'react';
import { ReactElement } from 'react';
import { FaDiscord, FaTelegram } from 'react-icons/fa';
import { FiGithub, FiGlobe, FiMail, FiUser } from 'react-icons/fi';

import { cx } from '@/lib/cx';
import { getAuthorMetadata } from '@/lib/get_author_metadata';

type ENStateResponse = {
    name: string;
    address: string;
    avatar: string;
    display: string;
};

export const Author: FC<{
    name: string;
    socials?: boolean;
    size?: 'normal' | 'small';
    link?: boolean;
}> = async ({ name, socials = true, size = 'normal', link = false }) => {
    const author_metadata = await getAuthorMetadata(name);

    let avatar = avatars[name as keyof typeof avatars]?.['avatar']
        ? await avatars[name as keyof typeof avatars]['avatar'].then(
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

        if (metadataResponse.status === 200) {
            avatar = `https://metadata.ens.domains/mainnet/avatar/${name}`;
        }
    }

    return (
        <div className="relative flex items-center rounded-lg bg-white p-2 sm:items-stretch">
            {link && (
                <Link href={'/author/' + name} className="absolute inset-0" />
            )}
            <div className="flex items-center justify-center">
                <div
                    className={cx(
                        'aspect-square sm:flex-1 flex items-center justify-center rounded-full text-white',
                        size === 'normal'
                            ? 'min-w-[8rem] max-w-[8rem] xs:max-w-[10rem] sm:max-w-[12rem]'
                            : 'w-32'
                    )}
                    style={{
                        background:
                            'linear-gradient(330.4deg, #44BCF0 4.54%, #7298F8 59.2%, #A099FF 148.85%)',
                    }}
                >
                    {avatar ? (
                        <img src={avatar} alt={name} className="rounded-lg" />
                    ) : (
                        <FiUser />
                    )}
                </div>
            </div>
            <div
                className={cx(
                    'flex flex-1 flex-col justify-between min-w-0 sm:flex-row',
                    size === 'normal' ? 'p-4' : 'p-2 pl-4'
                )}
            >
                <div className="flex min-w-0 flex-col justify-center gap-1">
                    <div className="overflow-x-hidden text-ellipsis text-2xl font-bold">
                        {name}
                    </div>

                    {author_metadata?.records.description && (
                        <div className="overflow-x-hidden text-ellipsis">
                            {author_metadata.records.description}
                        </div>
                    )}

                    {name.endsWith('.eth') && (
                        <Link
                            href={'https://ens.app/' + name}
                            className="text-ens-blue z-10 overflow-x-hidden text-ellipsis hover:opacity-90"
                            target="_blank"
                        >
                            View Profile
                        </Link>
                    )}
                </div>

                {socials && (
                    <div className="flex h-fit gap-2 text-xl">
                        {(
                            [
                                [
                                    'com.twitter',
                                    'https://x.com/' +
                                        formatRecord(
                                            'com.twitter',
                                            author_metadata.records[
                                                'com.twitter'
                                            ]
                                        ),
                                    <span className="-mr-1 flex aspect-square w-5 items-center justify-center leading-3">
                                        {'𝕏'}
                                    </span>,
                                ],
                                [
                                    'email',
                                    'mailto:' +
                                        author_metadata.records['email'],
                                    <FiMail />,
                                ],
                                [
                                    'org.telegram',
                                    'https://t.me/' +
                                        formatRecord(
                                            'org.telegram',
                                            author_metadata.records[
                                                'org.telegram'
                                            ]
                                        ),
                                    <FaTelegram />,
                                ],
                                [
                                    'url',
                                    author_metadata.records.url,
                                    <FiGlobe />,
                                ],
                                [
                                    'com.github',
                                    'https://github.com/' +
                                        formatRecord(
                                            'com.github',
                                            author_metadata.records[
                                                'com.github'
                                            ]
                                        ),
                                    <FiGithub />,
                                ],
                                [
                                    'com.discord',
                                    formatRecord(
                                        'com.discord',
                                        author_metadata.records['com.discord']
                                    ),
                                    <FaDiscord />,
                                ],
                            ] as [
                                keyof typeof author_metadata.records,
                                string,
                                ReactElement
                            ][]
                        )
                            .filter(
                                ([record, url, _element]) =>
                                    author_metadata.records[record] && !!url
                            )
                            .map(([record, url, element]) => (
                                <Link
                                    href={url}
                                    key={record}
                                    target="_blank"
                                    className="hover:text-ens-blue"
                                >
                                    {element}
                                </Link>
                            ))}
                    </div>
                )}
            </div>
        </div>
    );
};
