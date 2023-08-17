'use client';
import { lightTheme, ThorinGlobalStyles } from '@ensdomains/thorin';
import { FC, ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'styled-components';

const queryClient = new QueryClient();

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={lightTheme}>
                <ThorinGlobalStyles />
                {children}
            </ThemeProvider>
        </QueryClientProvider>
    );
};
