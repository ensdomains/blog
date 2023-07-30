import './globals.css';

import { ReactNode } from 'react';

import { Navbar } from '@/components/navbar/Navbar';
import { Providers } from '@/components/Providers';

export const metadata = {
    title: 'ENS Blog',
    description: 'The official blog of the Ethereum Name Service',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <div className="mx-auto mb-36 w-full max-w-4xl px-4">
                        <Navbar />
                        {children}
                    </div>
                </Providers>
            </body>
        </html>
    );
}
