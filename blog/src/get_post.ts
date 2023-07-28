import { BlogPostMetadataSchema } from './types/BlogPostMetadata';

export const getPost = async (path: string) => {
    // TODO: Ideally this data is loaded from the top of the mdx file at (path).

    return await BlogPostMetadataSchema.parseAsync({
        // Title of the post
        title: 'My first blogpost',
        // Description of the post
        description: 'The description of this blogpost',
        // Date of the post
        date: '2023-01-01',
        // Tags for the post
        tags: [],
        // ENS Name of the author
        author: 'luc.eth',
    });
};
