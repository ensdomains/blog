'use client';

import { useState } from 'react';

import { TransparentModal } from './Modal';

export const DynImage = (properties) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <>
            <button
                className="not-prose block w-full cursor-zoom-in border"
                onClick={() => {
                    setExpanded(true);
                }}
            >
                <img
                    src={properties.src}
                    alt={properties.alt}
                    className="max-w-full"
                />
            </button>
            <TransparentModal
                open={expanded}
                onClose={() => setExpanded(false)}
            >
                <div className="max-h-[80vh] max-w-[80vw]">
                    <button
                        className="h-fit w-fit cursor-zoom-out"
                        onClick={() => {
                            setExpanded(false);
                        }}
                    >
                        <img
                            src={properties.src}
                            alt={properties.alt}
                            className="max-h-full max-w-full"
                        />
                    </button>
                </div>
            </TransparentModal>
        </>
    );
};
