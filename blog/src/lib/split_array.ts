export const splitArray = <T>(array: T[], max: number): T[][] => {
    const result: T[][] = [];

    for (let index = 0; index < array.length; index += max) {
        result.push(array.slice(index, index + max));
    }

    return result;
};

export const splitArrayBiasFirst = <T>(array: T[], max: number): T[][] => {
    const first = array.shift();
    const result: T[][] = splitArray(array, max);

    if (first) {
        const first_entry = result[0] || [];

        first_entry.unshift(first);
        result[0] = first_entry;
    }

    return result;
};
