import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import { FiExternalLink, FiMail, FiYoutube } from 'react-icons/fi';

import xLogo from '../../public/icons/x.svg';

export const DynLink: FC<{ href: string }> = ({ href, ...properties }) => {
    const isExternal = href.startsWith('http');
    const isEmail = href.startsWith('mailto:');
    const isENS = href.startsWith('luc.eth');
    const isYoutube = href.startsWith('https://www.youtube.com/watch?v=');
    const isTwitter = href.startsWith('https://twitter.com/');

    const isSpecial = isEmail || isENS || isYoutube || isTwitter;
    const isBlank = isExternal || isSpecial;

    if (isENS) {
        href = `https://ens.app/${href}`;
    }

    return (
        <span className="text-ens-blue not-prose m-0 gap-1 p-0 hover:underline">
            <span className="inline-flex pr-0.5 text-xs">
                {isYoutube && <FiYoutube />}
                {isTwitter && (
                    <Image src={xLogo} alt="X" className="block h-3 w-3" />
                )}
                {isEmail && <FiMail />}
            </span>
            <Link
                {...properties}
                href={href}
                target={properties['target'] || isBlank ? '_blank' : undefined}
            />
            {isExternal && !isSpecial && (
                <span className="inline-flex pl-0.5 text-xs">
                    <FiExternalLink />
                </span>
            )}
        </span>
    );
};
