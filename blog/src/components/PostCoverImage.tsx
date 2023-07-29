import Image from 'next/image';
import { FC } from 'react';

import { BlogPostMetadata } from '@/types/BlogPostMetadata';

import { Youtube } from './Youtube';

export const PostCoverImage: FC<{ post: BlogPostMetadata }> = ({ post }) => {
    const isYoutube = post.youtube !== undefined;

    return (
        <div className="not-prose relative mx-auto my-6 w-full max-w-2xl lg:mb-8 lg:max-w-3xl">
            <div className="lg:-mx-10">
                {isYoutube ? (
                    <Youtube src={post.youtube} />
                ) : (
                    <Image
                        src={post.cover}
                        alt={post.title}
                        width="900"
                        height={(1080 / 1920) * 900}
                        className="w-full rounded-lg"
                    />
                )}
            </div>
        </div>
    );
};
