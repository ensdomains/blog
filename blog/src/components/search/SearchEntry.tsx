export type MatchesPosition = { start: number; length: number }[];

export type SearchEntry = {
    slug: string;
    title: string;
    description: string;
    _formatted: {
        content: string;
        slug: string;
        title: string;
        description: string;
    };
    _matchesPosition: {
        content: MatchesPosition;
        slug: MatchesPosition;
        title: MatchesPosition;
        description: MatchesPosition;
    };
};
