// Function that takes in an array and a joiner and returns a new array with the joiner in between each element of the array.
export const joinArray = <K, V>(array: K[], joiner: V): (K | V)[] => {
    const result: (K | V)[] = [];

    for (let index = 0; index < array.length; index++) {
        result.push(array[index]);

        if (index < array.length - 1) {
            result.push(joiner);
        }
    }

    return result;
};
