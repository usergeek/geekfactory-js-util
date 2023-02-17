import {getRandomNumber, RandomNumberOptions} from "./randomNumberUtils";

describe("RandomUtils", () => {
    it("NumberUtils.randomNumber", () => {
        const fn = (minimum: number, maximum: number, random: number, options?: RandomNumberOptions) => {
            jest.spyOn(global.Math, 'random').mockReturnValue(random);
            const value = getRandomNumber(minimum, maximum, options);
            jest.spyOn(global.Math, 'random').mockRestore();
            return value;
        };
        expect(fn(0, 1, 0)).toBe(0)
        expect(fn(0, 1, 1)).toBe(1)
        expect(fn(0, 1, 0.7)).toBe(1)
        expect(fn(0, 1, 0.7, {round: false})).toBe(0.7)
        expect(fn(0, 1, 0.2)).toBe(0)
        expect(fn(0, 1, 0.2, {round: false})).toBe(0.2)

        expect(fn(0, 10, 0)).toBe(0)
        expect(fn(0, 10, 1)).toBe(10)
        expect(fn(0, 10, 0.7)).toBe(7)
        expect(fn(0, 10, 0.2)).toBe(2)
    })

})