/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
'use client';
import Link from 'next/link';
import { FC } from 'react';
import { FaDiscord, FaYoutube } from 'react-icons/fa';
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
        icon: (
            <div className="h-5 w-5 fill-neutral-400 transition-colors hover:fill-black">
                {/* X.com logo */}
                <svg viewBox="0 0 1200 1227" xmlns="http://www.w3.org/2000/svg">
                    <path d="M714.163 519.284L1160.89 0H1055.03L667.137 450.887L357.328 0H0L468.492 681.821L0 1226.37H105.866L515.491 750.218L842.672 1226.37H1200L714.137 519.284H714.163ZM569.165 687.828L521.697 619.934L144.011 79.6944H306.615L611.412 515.685L658.88 583.579L1055.08 1150.3H892.476L569.165 687.854V687.828Z" />
                </svg>
            </div>
        ),
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
