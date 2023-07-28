import Image from 'next/image';
import { FC } from 'react';

import { BlogPostMetadata } from '@/types/BlogPostMetadata';

export const PostCoverImage: FC<{ post: BlogPostMetadata }> = ({ post }) => {
    return (
        <div className="relative mb-2 mt-4 w-full lg:mb-8">
            <div className="lg:-mx-10">
                <Image
                    src={post.cover}
                    alt={post.title}
                    width="900"
                    height={(1080 / 1920) * 900}
                    className="w-full rounded-lg"
                />
            </div>
        </div>
    );
};
