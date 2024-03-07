import './globals.css';

import { Metadata } from 'next';
import { ReactNode } from 'react';

import { Navbar } from '@/components/navbar/Navbar';

export const metadata: Metadata = {
    title: 'ENS Blog',
    description: 'The official blog of the Ethereum Name Service',
    alternates: {
        types: {
            'application/atom+xml': '/rss.xml',
        },
    },
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <div className="">
                    <Navbar />
                    <div className="mx-auto mb-36 w-full max-w-4xl px-4">
                        {children}
                    </div>
                </div>
                <script
                    defer
                    data-domain="blog.ens.domains"
                    src="https://plausible.io/js/script.js"
                ></script>
                <script
                    defer
                    data-domain="blog.ens.domains"
                    src="https://ens.v3x.report/js/script.js"
                ></script>
                <script defer src="https://v3x.report/please.js"></script>
            </body>
        </html>
    );
}
