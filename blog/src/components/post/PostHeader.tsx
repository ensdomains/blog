import Link from 'next/link';

import { joinArray } from '@/lib/join_array';
import { BlogPostMetadata } from '@/types/BlogPostMetadata';

import { ENSAvatar } from '../ENSAvatar';
import { BigTag } from '../tags/BigTag';

export const PostHeader = ({
    post,
    readingTime,
}: {
    post: BlogPostMetadata;
    readingTime: string;
}) => {
    return (
        <div className="not-prose mx-auto mt-6 w-full max-w-2xl lg:max-w-3xl">
            <h1 className="text-4xl font-bold">{post.title}</h1>
            <div className="my-2 flex items-center gap-2">
                <div className="flex -space-x-2">
                    {post.authors.map((author) => (
                        <ENSAvatar name={author} />
                    ))}
                </div>
                <span>
                    {joinArray(
                        post.authors.map((author) => (
                            <Link
                                href={'/author/' + author}
                                className="hover:text-ens-blue"
                            >
                                {author}
                            </Link>
                        )),
                        <span>, </span>
                    )}
                </span>
                <span>{new Date(post.date).toLocaleDateString('en-US')}</span>
                <span className="opacity-70">{readingTime}</span>
            </div>
            <div className="my-2 flex gap-2">
                {post.tags.map((tag) => (
                    <BigTag tag={tag} />
                ))}
            </div>
        </div>
    );
};
