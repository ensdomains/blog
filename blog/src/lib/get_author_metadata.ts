type PresetKeys =
    | 'email'
    | 'com.twitter'
    | 'org.telegram'
    | 'description'
    | 'url'
    | 'com.github'
    | 'com.discord';

type ENStateResponse = {
    name: string;
    address: string;
    avatar?: string;
    display?: string;
    records?: Record<PresetKeys & string, string>;
};

export const getAuthorMetadata = async (
    name: string
): Promise<ENStateResponse | undefined> => {
    const response = await fetch('https://enstate.rs/n/' + name);

    const data: ENStateResponse | undefined =
        response.status === 200 ? await response.json() : undefined;

    return data;
};
