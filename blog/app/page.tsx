import { BlogPostPreview } from '@/components/BlogPostPreview';
import { getPosts } from '@/lib/get_posts';

const page = async () => {
    const posts = await getPosts();

    return (
        <>
            <div className="mx-auto w-full max-w-4xl px-4">
                <div>main page {JSON.stringify(posts)}</div>
                <ul className="grid grid-cols-3 gap-2">
                    {posts.map((post) => (
                        <li key={post.slug} className="w-full">
                            <BlogPostPreview post={post} />
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default page;
