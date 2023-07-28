import { getPost } from '@/get_post';

import { getPosts } from './get_posts';

type PageProperties = {
    params: { slug: string[]; file: string };
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
    const pages = await getPosts();

    return pages.map((post) => ({
        slug: post.slug.split('/'),
        // Other post data:
        file: post.file,
    }));
}

const page = async (properties: PageProperties) => {
    const post = await getPost(properties.params.file);

    return (
        <div>
            page: {JSON.stringify(properties.params)} - {JSON.stringify(post)}
        </div>
    );
};

export default page;
