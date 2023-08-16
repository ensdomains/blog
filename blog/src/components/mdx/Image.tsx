'use client';
import { AnimatePresence, motion } from 'framer-motion';
import NextImage, { ImageProps as NextImageProperties } from 'next/image';
import { useEffect, useState } from 'react';

type ImageVariant = 'full' | 'wide' | 'normal' | 'small';

type ImageProperties = NextImageProperties & {
    size?: ImageVariant;
};

export const Image = (properties: ImageProperties) => {
    const [expanded, setExpanded] = useState(false);

    useEffect(() => {
        const closeFullscreen = (event) => {
            if (event.key !== 'Escape' || !expanded) return;

            setExpanded(false);
        };

        document.addEventListener('keydown', closeFullscreen);

        return () => {
            document.removeEventListener('keydown', closeFullscreen);
        };
    }, [expanded]);

    useEffect(() => {
        document.body.style.overflow = expanded ? 'hidden' : 'auto';
    }, [expanded]);

    // eslint-disable-next-line unicorn/explicit-length-check
    const size = properties.size || 'full';

    return (
        <button
            className="not-prose mx-auto flex rounded-2xl"
            onClick={() => setExpanded(!expanded)}
            onBlur={() => setExpanded(false)}
        >
            <motion.div
                layoutId={`${properties.src}-image`}
                onClick={() => setExpanded(true)}
            >
                <NextImage
                    {...properties}
                    quality={1}
                    className={`z-10 w-full rounded-2xl border ${
                        size === 'normal' ? 'max-w-md' : ''
                    }`}
                />
            </motion.div>
            <AnimatePresence>
                {expanded && (
                    <motion.div
                        // eslint-disable-next-line tailwindcss/migration-from-tailwind-2
                        className="fixed inset-0 cursor-default bg-black  bg-opacity-50"
                        key={`${properties.src}-image-backdrop`}
                        onClick={() => setExpanded(false)}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    ></motion.div>
                )}
            </AnimatePresence>
            {expanded && (
                <motion.div
                    className="pointer-events-none fixed inset-0 flex cursor-default items-center justify-center"
                    key={`${properties.src}-image-container`}
                    onClick={() => setExpanded(false)}
                >
                    <motion.div
                        layoutId={`${properties.src}-image`}
                        className={'block max-h-[90vh] w-screen max-w-[90vw]'}
                        style={{
                            aspectRatio:
                                Number(properties.width) /
                                Number(properties.height),
                        }}
                    >
                        <NextImage
                            {...properties}
                            quality={1}
                            className="pointer-events-auto z-10 w-full cursor-pointer rounded-2xl"
                            key={`${properties.src}-image`}
                            draggable={false}
                        />
                    </motion.div>
                </motion.div>
            )}
            {properties.title && (
                <span className="text-center text-sm">{properties.title}</span>
            )}{' '}
        </button>
    );
};
