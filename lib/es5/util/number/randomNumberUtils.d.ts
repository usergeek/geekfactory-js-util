export type RandomNumberOptions = {
    round?: boolean;
};
/**
 * Returns a random number between min (inclusive) and max (inclusive)
 * @param {number} min Minimum number inclusive
 * @param {number} max Maximum number inclusive
 * @param {RandomNumberOptions} options. Default: {round: true}
 */
export declare const getRandomNumber: (min: number, max: number, options?: RandomNumberOptions) => number;
