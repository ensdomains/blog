import NextImage, { ImageProps } from 'next/image';

export const Image = async (properties: ImageProps) => {
    return (
        <span className="not-prose block w-full border">
            <NextImage {...properties} quality={1} className="w-full" />
        </span>
    );
};
