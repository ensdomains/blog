/**
 * assets/assets is generated by the assets builder.
 */
import { covers } from 'assets/assets';
import Image from 'next/image';
import Link from 'next/link';

import { BlogPostMetadataPlus } from '@/lib/get_posts';

import { ENSAvatar } from './ENSAvatar';
import { SmallTag } from './tags/SmallTag';

type Properties = {
    post: BlogPostMetadataPlus;
};

export const BlogPostPreview = async ({ post }: Properties) => {
    const cover = Object.keys(covers).includes(post.file)
        ? await covers[post.file as keyof typeof covers]['cover-thumb']
              .then((image) => image.default)
              .catch(() => {
                  console.error('Failed to load cover for post', post.file);
              })
        : undefined;

    return (
        <Link
            href={'/post/' + post.slug}
            className="outline-ens-blue flex h-full w-full flex-col overflow-hidden rounded-lg border bg-white outline-2 transition-all hover:bg-gray-50 hover:outline"
        >
            <span className="bg-ens-grey1 aspect-video w-full">
                {cover ? (
                    <Image
                        src={cover}
                        className="aspect-video h-full w-full object-cover"
                        alt={post.title}
                    />
                ) : (
                    <img
                        src={post.cover}
                        className="aspect-video h-full w-full object-cover"
                        alt={post.title}
                    />
                )}
            </span>
            <span className="flex grow flex-col p-2">
                <span className="text-ens-grey2 text-xs">{post.date}</span>
                <span className="text-lg">{post.title}</span>
            </span>
            {post.tags && (
                <span className="flex flex-wrap gap-1 px-2 pb-2">
                    {post.tags.map((tag) => (
                        <SmallTag tag={tag} />
                    ))}
                </span>
            )}
            <span className="border-ens-grey1 flex items-center gap-2 border-t p-2">
                <span className="flex -space-x-2">
                    {post.authors.map((author) => (
                        <ENSAvatar name={author} />
                    ))}
                </span>
                <span>{post.authors.join(', ')}</span>
            </span>
        </Link>
    );
};
