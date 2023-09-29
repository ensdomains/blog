/* eslint-disable sonarjs/no-duplicate-string */
import clsx from 'clsx';
import { FaFacebookF, FaLinkedin } from 'react-icons/fa';

import { BlogPostMetadata } from '@/types/BlogPostMetadata';

import { Author } from '../Author';
import { BigTag } from '../tags/BigTag';
import { XIcon } from '../XIcon';

export const PostFooter = ({ post }: { post: BlogPostMetadata }) => {
    return (
        <div className="not-prose mx-auto mt-6 flex w-full max-w-3xl flex-col gap-4">
            <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-2 sm:flex-row sm:justify-between">
                <div className="my-2 flex flex-wrap justify-center gap-2">
                    {post.tags.map((tag) => (
                        <BigTag tag={tag} />
                    ))}
                </div>
                <div className="flex flex-1 items-center justify-end gap-4 pr-2 text-xl">
                    <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                            post.title + ' | ENS Blog'
                        )}&url=${encodeURIComponent(
                            'https://blog.ens.domains/post/' + post.slug
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-5 items-center"
                    >
                        <XIcon />
                    </a>
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            'https://blog.ens.domains/post/' + post.slug
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center"
                    >
                        <FaFacebookF />
                    </a>
                    <a
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                            'https://blog.ens.domains/post/' + post.slug
                        )}&title=${encodeURIComponent(
                            post.title + ' | ENS Blog'
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-[1px] flex items-center text-[23px]"
                    >
                        <FaLinkedin />
                    </a>
                </div>
            </div>
            <div
                className={clsx(
                    'grid grid-cols-1 gap-4',
                    post.authors.length > 1 ? 'sm:grid-cols-2' : ''
                )}
            >
                {post.authors.map((author) => (
                    <Author name={author} socials={false} size="small" link />
                ))}
            </div>
        </div>
    );
};
