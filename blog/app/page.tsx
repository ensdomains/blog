import { BlogPostPreview } from '@/components/PostPreview';
import { getPostsMetadata } from '@/lib/get_posts';

const page = async () => {
    const posts = await getPostsMetadata();

    return (
        <div className="mt-2">
            <ul className="grid grid-cols-3 gap-2">
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
