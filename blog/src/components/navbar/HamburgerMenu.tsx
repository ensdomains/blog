/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';
import Link from 'next/link';
import { FC } from 'react';
import { FaDiscord, FaYoutube } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import { FiGithub, FiMessageCircle } from 'react-icons/fi';

import { CrossSVG, MenuSVG } from '../ClientIcons';

const links = [
    { name: 'ENS Manager', to: 'https://app.ens.domains' },
    { name: 'Community', to: 'https://chat.ens.domains' },
    { name: 'Support', to: 'https://support.ens.domains' },
    { name: 'Governance', to: 'https://ensdao.org' },
];

const socials = [
    {
        icon: <FaXTwitter />,
        to: 'https://twitter.com/ensdomains',
    },
    { icon: <FiGithub />, to: 'https://github.com/ensdomains' },
    { icon: <FaDiscord />, to: 'https://chat.ens.domains' },
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

            <div className="flex justify-around p-4">
                {socials.map((social) => (
                    <Link
                        key={`social-${social.to}`}
                        target="_blank"
                        className="rounded-lg text-2xl text-neutral-400 transition-colors duration-300 hover:text-black"
                        href={social.to}
                    >
                        {social.icon}
                    </Link>
                ))}
            </div>
        </>
    );
};

export const HamburgerMenu = () => {
    return (
        <div className="group">
            <div className="text-ens-grey2 fill-ens-grey2">
                <button
                    id="button-hamburger"
                    className="hover:bg-ens-grey2/20 flex items-center rounded-full p-2"
                >
                    <div
                        onClick={() => {
                            const activeElement =
                                document.activeElement as HTMLElement;

                            activeElement.blur();
                        }}
                        className="no-hover:group-hover:block hidden group-focus-within:block"
                    >
                        <CrossSVG className="" />
                    </div>
                    <div className="no-hover:group-hover:hidden group-focus-within:hidden">
                        <MenuSVG className="" />
                    </div>
                </button>
            </div>
            <div className="card no-hover:group-hover:block absolute left-0 top-[4.8rem] hidden w-full group-focus-within:block sm:left-[unset] sm:w-80">
                <Content />
            </div>
        </div>
    );
};
