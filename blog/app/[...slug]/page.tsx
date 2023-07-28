import { getPostBySlug } from '@/lib/get_post_by_slug';
import { getPostsMetadata } from '@/lib/get_posts';

type PageProperties = {
    params: { slug: string[] };
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
    const pages = await getPostsMetadata();

    return pages.map((post) => ({
        slug: post.slug.split('/'),
    }));
}

const page = async ({ params }: PageProperties) => {
    if (params.slug.length !== 1) throw new Error('Invalid slug');

    const post = await getPostBySlug(params.slug[0]);

    return (
        <div>
            <h1>{post.title}</h1>
            <div>
                
            </div>
        </div>
    );
};

export default page;
