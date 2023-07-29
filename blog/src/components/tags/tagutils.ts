const capFirst = (string_: string) =>
    string_.charAt(0).toUpperCase() + string_.slice(1);

export const parseTag = (tag: string) => {
    return capFirst(tag.replace(/[_-]/g, ' '));
};
