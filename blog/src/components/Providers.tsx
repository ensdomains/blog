'use client';
import { lightTheme, ThorinGlobalStyles } from '@ensdomains/thorin';
import { FC, ReactNode } from 'react';
import { ThemeProvider } from 'styled-components';

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <ThemeProvider theme={lightTheme}>
            <ThorinGlobalStyles />
            {children}
        </ThemeProvider>
    );
};
