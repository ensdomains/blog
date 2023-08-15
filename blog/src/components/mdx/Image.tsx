import NextImage, { ImageProps as NextImageProperties } from 'next/image';

type ImageVariant = 'full' | 'wide' | 'normal' | 'small';

type ImageProperties = NextImageProperties & {
    size?: ImageVariant;
};

export const Image = async (properties: ImageProperties) => {
    // eslint-disable-next-line unicorn/explicit-length-check
    const size = properties.size || 'full';

    if (size == 'normal') {
        return (
            <span className="not-prose flex w-full flex-col items-center justify-center gap-2">
                <div className="max-w-md">
                    <NextImage
                        {...properties}
                        quality={1}
                        className="w-full rounded-2xl border"
                    />
                </div>
                {properties.title && (
                    <span className="text-center text-sm">
                        {properties.title}
                    </span>
                )}
            </span>
        );
    }

    if (size == 'full') {
        return (
            <span className="not-prose block w-full">
                <NextImage
                    {...properties}
                    quality={1}
                    className="w-full rounded-2xl border"
                />
                {properties.title && (
                    <span className="text-center text-sm">
                        {properties.title}
                    </span>
                )}{' '}
            </span>
        );
    }

    return (
        <span className="not-prose block w-full border">
            Unknown Image Size
        </span>
    );
};
