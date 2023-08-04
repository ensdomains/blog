'use client';

import { CrossSVG, MenuSVG } from '@ensdomains/thorin';
import { FC, useState } from 'react';
import { FaDiscord, FaMedium, FaYoutube } from 'react-icons/fa';
import { FiGithub, FiMessageCircle, FiTwitter } from 'react-icons/fi';

import { cx } from '../../lib/cx';

const links = [
    { name: 'ENS Manager', to: 'https://app.ens.domains' },
    { name: 'Community', to: 'https://chat.ens.domains' },
    { name: 'Support', to: 'https://support.ens.domains' },
    { name: 'Governance', to: 'https://ensdao.org' },
];

const socials = [
    { icon: <FiTwitter />, to: 'https://twitter.com/ensdomains' },
    { icon: <FiGithub />, to: 'https://github.com/ensdomains' },
    { icon: <FaDiscord />, to: 'https://chat.ens.domains' },
    { icon: <FaMedium />, to: 'https://medium.com/the-ethereum-name-service' },
    {
        icon: <FiMessageCircle />,
        to: 'https://discuss.ens.domains/',
    },
    {
        icon: <FaYoutube />,
        to: 'https://youtube.com/ensdomains',
    },
];

const Content: FC = () => {
    return (
        <>
            <div className="grid grid-cols-2 gap-1 p-2">
                {links.map((link) => (
                    <a
                        key={`link-${link.name}`}
                        target="_blank"
                        className="rounded-lg px-4 py-2 text-neutral-700 hover:bg-neutral-100"
                        href={link.to}
                    >
                        {link.name}
                    </a>
                ))}
            </div>
            <div className="h-[1.4px] w-full bg-neutral-100"></div>

            <div className="flex justify-between p-4">
                {socials.map((social) => (
                    <a
                        key={`social-${social.to}`}
                        target="_blank"
                        className="rounded-lg text-2xl text-neutral-400 transition-colors duration-300 hover:text-black"
                        href={social.to}
                    >
                        {social.icon}
                    </a>
                ))}
            </div>
        </>
    );
};

export const HamburgerMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <div className="text-ens-grey2 fill-ens-grey2">
                <button
                    className="hover:bg-ens-grey2/20 flex items-center rounded-full p-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <CrossSVG /> : <MenuSVG />}
                </button>
            </div>
            {isOpen && (
                <div className="absolute left-0 top-24 block w-full md:hidden">
                    <div className="card w-full !rounded-none">
                        <Content />
                    </div>
                </div>
            )}
            <div
                className={cx(
                    'w-80 absolute top-24',
                    isOpen ? 'hidden md:block' : 'hidden'
                )}
            >
                <div className="hidden md:block">
                    <div className="card">
                        <Content />
                    </div>
                </div>
            </div>
        </>
    );
};
