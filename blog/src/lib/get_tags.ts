import { BlogPostMetadataPlus, getPostsMetadata } from './get_posts';

export const getTags = async () => {
    const pages = await getPostsMetadata();

    const tags: Record<string, BlogPostMetadataPlus[]> = {};

    // Make the object tags with the tag as key and the value an array of the posts that have that tag
    for (const page of pages) {
        for (let tag of page.tags) {
            tag = tag.toLowerCase().replaceAll(' ', '-');

            if (tags[tag]) {
                tags[tag].push(page);
            } else {
                tags[tag] = [page];
            }
        }
    }

    return tags;
};
