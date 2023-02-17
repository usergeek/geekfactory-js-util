"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRandomNumber = void 0;
/**
 * Returns a random number between min (inclusive) and max (inclusive)
 * @param {number} min Minimum number inclusive
 * @param {number} max Maximum number inclusive
 * @param {RandomNumberOptions} options. Default: {round: true}
 */
const getRandomNumber = (min, max, options) => {
    const { round = true } = options || {};
    const value = Math.random() * (max - min) + min;
    return round ? Math.round(value) : value;
};
exports.getRandomNumber = getRandomNumber;
//# sourceMappingURL=randomNumberUtils.js.map