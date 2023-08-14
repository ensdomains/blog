/**
 * assets/assets is generated by the assets builder.
 */
import { covers } from 'assets/assets';
import Image from 'next/image';
import { FC } from 'react';

import { BlogPostMetadataPlus } from '@/lib/get_posts';

import { Youtube } from './Youtube';

export const PostCoverImage: FC<{ post: BlogPostMetadataPlus }> = async ({
    post,
}) => {
    const isYoutube = post.youtube !== undefined;

    const cover = Object.keys(covers).includes(post.file)
        ? await covers[post.file as keyof typeof covers]['cover'].catch(() => {
              console.error('Failed to load cover for post', post.file);
          })
        : undefined;

    return (
        <div className="not-prose relative mx-auto my-6 w-full max-w-2xl lg:mb-8 lg:max-w-3xl">
            <div className="lg:-mx-10">
                {isYoutube ? (
                    <Youtube src={post.youtube} />
                ) : (
                    <Image
                        alt={post.title}
                        width="900"
                        height={(1080 / 1920) * 900}
                        className="w-full rounded-lg"
                        priority
                        src={cover || post.cover}
                    />
                )}
            </div>
        </div>
    );
};
