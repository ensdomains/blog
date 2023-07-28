import { getPosts } from '@/get_posts';

const page = async () => {
    const posts = await getPosts();

    return (
        <>
            <div>main page {JSON.stringify(posts)}</div>
            <ul>
                {posts.map((post) => (
                    <li key={post.slug}>
                        <a href={`/${post.slug}`}>{post.file}</a>
                    </li>
                ))}
            </ul>
        </>
    );
};

export default page;
