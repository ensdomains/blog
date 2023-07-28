import { getPost } from '@/lib/get_post';
import { BlogPostMetadataPlus, getPosts } from '@/lib/get_posts';

type PageProperties = {
    params: { slug: string[]; post: BlogPostMetadataPlus };
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
    console.log('GENERATING MAP OF ALL POSTS');

    const pages = await getPosts();

    return pages.map((post) => ({
        slug: post.slug.split('/'),
        post,
    }));
}

const page = async ({ params }: PageProperties) => {
    console.log({ params });
    const post = await getPost(params.post?.file);

    return (
        <div>
            page: {JSON.stringify(params)} - {JSON.stringify(post)}
        </div>
    );
};

export default page;
