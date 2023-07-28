import Link from 'next/link';

import { BlogPostMetadata } from '@/types/BlogPostMetadata';

import { ENSAvatar } from './ENSAvatar';

type Properties = {
    post: BlogPostMetadata;
};

export const BlogPostPreview = ({ post }: Properties) => {
    return (
        <Link
            href={post.slug}
            className="outline-ens-blue flex h-full w-full flex-col overflow-hidden rounded-lg border bg-white outline-2 transition-all hover:bg-gray-50 hover:outline"
        >
            <span className="bg-ens-grey1 aspect-video w-full">
                <img
                    src={post.cover}
                    className="aspect-video h-full w-full object-cover"
                    alt={post.title}
                />
            </span>
            <span className="flex grow flex-col p-2">
                <span className="text-ens-grey2 text-xs">{post.date}</span>
                <span className="text-lg">{post.title}</span>
            </span>
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
