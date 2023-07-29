import { ResolvingMetadata } from 'next';

import { BlogPostPreview } from '@/components/PostPreview';
import { getPostsMetadata } from '@/lib/get_posts';
import { createMetadata } from '@/lib/metadata';

export const generateMetadata = async (_: any, parent: ResolvingMetadata) => {
    const parentMetadata = await parent;

    return createMetadata(
        {
            title: 'ENS Blog',
            description: 'The official blog of the Ethereum Name Service',
            path: '/',
        },
        parentMetadata,
        {
            openGraph: {
                type: 'website',
                // title: post.title,
                // authors: post.authors?.map((author) => author),
                images: '/opengraph.jpg',
                // description: post.description,
                // tags: post.tags,
            },
            twitter: {
                card: 'summary_large_image',
            },
        }
    );
};

const page = async () => {
    const posts = await getPostsMetadata();

    return (
        <div className="mt-2">
            <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3">
                {posts.map((post) => (
                    <li key={post.slug} className="w-full">
                        <BlogPostPreview post={post} />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default page;
