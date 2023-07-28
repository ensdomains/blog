import { getPosts } from './get_posts';

type PageProperties = {
    params: { slug: string[] };
};

// eslint-disable-next-line unicorn/prevent-abbreviations
export async function generateStaticParams() {
    const pages = await getPosts();

    return pages.map((post) => ({
        slug: post.slug.split('/'),
        // Other post data:
    }));
}

const page = async (properties: PageProperties) => {
    return <div>page: {JSON.stringify(properties.params)}</div>;
};

export default page;
