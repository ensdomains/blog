import { BlogPostMetadataPlus, getPostsMetadata } from './get_posts';

export const getAuthors = async () => {
    const pages = await getPostsMetadata();

    const authors: Record<string, BlogPostMetadataPlus[]> = {};

    // Make the object tags with the author as key and the value an array of the posts that have that tag
    for (const page of pages) {
        for (let author of page.authors) {
            author = author.toLowerCase().replaceAll(' ', '_');

            if (authors[author]) {
                authors[author].push(page);
            } else {
                authors[author] = [page];
            }
        }
    }

    return authors;
};
