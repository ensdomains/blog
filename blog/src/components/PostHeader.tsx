import { BlogPostMetadata } from '@/types/BlogPostMetadata';

import { ENSAvatar } from './ENSAvatar';

const capFirst = (string_: string) =>
    string_.charAt(0).toUpperCase() + string_.slice(1);

export const PostHeader = ({ post }: { post: BlogPostMetadata }) => {
    return (
        <div className="mt-8 w-full">
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
                    <a
                        href="/"
                        className="text-ens-blue rounded-full bg-white px-2 text-base font-bold transition hover:scale-105"
                    >
                        {capFirst(tag)}
                    </a>
                ))}
            </div>
        </div>
    );
};
