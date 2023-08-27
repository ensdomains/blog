/* eslint-disable sonarjs/no-duplicate-string */
import Image from 'next/image';

import { BlogPostMetadata } from '@/types/BlogPostMetadata';

import facebookLogo from '../../../public/icons/facebook.png';
import linkedinLogo from '../../../public/icons/linkedin.png';
import xLogo from '../../../public/icons/x.svg';
import { Author } from '../Author';
import { BigTag } from '../tags/BigTag';

export const PostFooter = ({ post }: { post: BlogPostMetadata }) => {
    return (
        <div className="not-prose mx-auto mt-6 flex w-full max-w-3xl flex-col gap-4">
            {/* add a horizontal line to indicate start of footer */}
            <hr className="my-6 border-t-2" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {post.authors.map((author) => (
                    <Author name={author} socials={false} size="small" link />
                ))}
            </div>
            <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-2 sm:flex-row sm:justify-between">
                {/* insert share buttons for twitter, linkedin and facebook */}

                <div className="my-2 flex flex-wrap justify-center gap-2">
                    {post.tags.map((tag) => (
                        <BigTag tag={tag} />
                    ))}
                </div>
                <div className="flex flex-1 items-center justify-end gap-4">
                    <a
                        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                            post.title + ' | ENS Blog'
                        )}&url=${encodeURIComponent(
                            'https://blog.ens.domains/post/' + post.slug
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-6 items-center"
                    >
                        <Image src={xLogo} alt="X logo" />
                    </a>
                    <a
                        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                            'https://blog.ens.domains/post/' + post.slug
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-8 items-center"
                    >
                        <Image src={facebookLogo} alt="Facebook logo" />
                    </a>
                    <a
                        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                            'https://blog.ens.domains/post/' + post.slug
                        )}&title=${encodeURIComponent(
                            post.title + ' | ENS Blog'
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-8 items-center"
                    >
                        <Image src={linkedinLogo} alt="LinkedIn logo" />
                    </a>
                </div>
            </div>
        </div>
    );
};
