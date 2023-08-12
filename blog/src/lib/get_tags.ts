import { BlogPostMetadataPlus, getPostsMetadata } from './get_posts';
import { splitArray } from './split_array';

export const getTags = async () => {
    const pages = await getPostsMetadata();

    const tags: Record<string, BlogPostMetadataPlus[]> = {};

    // Make the object tags with the tag as key and the value an array of the posts that have that tag
    for (const page of pages) {
        for (let tag of page.tags) {
            tag = tag.toLowerCase().replaceAll(' ', '_');

            if (tags[tag]) {
                tags[tag].push(page);
            } else {
                tags[tag] = [page];
            }
        }
    }

    return tags;
};

export const getTagSlugs = async (
    maxPerPage: number
): Promise<
    {
        tag: string;
        page: string[];
    }[]
> => {
    const tags = await getTags();

    return Object.entries(tags).flatMap(([tag, posts]) => {
        const pages = splitArray(posts, maxPerPage);

        return pages.map((_, index) => ({
            tag,
            page: [(index + 1).toString()],
        }));
    });
};
