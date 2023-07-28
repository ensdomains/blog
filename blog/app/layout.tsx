import './globals.css';

import { ReactNode } from 'react';

export const metadata = {
    title: 'ENS Blog',
    description: 'A blog about ENS',
};

export default function RootLayout({ children }: { children: ReactNode }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
