import { BlogPostMetadata } from '@/types/BlogPostMetadata';

import { ENSAvatar } from './ENSAvatar';
import { BigTag } from './tags/BigTag';

export const PostHeader = ({ post }: { post: BlogPostMetadata }) => {
    return (
        <div className="not-prose mx-auto mt-6 w-full max-w-2xl lg:max-w-3xl">
            <h1 className="text-4xl font-bold">{post.title}</h1>
            <div className="my-2 flex items-center gap-2">
                <div className="flex -space-x-2">
                    {post.authors.map((author) => (
                        <ENSAvatar name={author} />
                    ))}
                </div>
                <span>{post.authors.join(', ')}</span>
                <span>{new Date(post.date).toLocaleDateString('en-US')}</span>
            </div>
            <div className="my-2 flex gap-2">
                {post.tags.map((tag) => (
                    <BigTag tag={tag} />
                ))}
            </div>
        </div>
    );
};
