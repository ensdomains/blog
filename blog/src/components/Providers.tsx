'use client';
import { FC, ReactNode } from 'react';
import Modal from 'react-modal';

export const Providers: FC<{ children: ReactNode }> = ({ children }) => {
    return <>{children}</>;
};
Modal.setAppElement('body');
