export const splitArray = <T>(array: T[], max: number): T[][] => {
    const result: T[][] = [];

    for (let index = 0; index < array.length; index += max) {
        result.push(array.slice(index, index + max));
    }

    return result;
};
