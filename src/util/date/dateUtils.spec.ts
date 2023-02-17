import {createUTCDate} from "./dateUtils";

describe("DateUtils", () => {
    it("createUTCDate", () => {
        expect(createUTCDate({year: 2022, month: 12, day: 29, hour: 6, minute: 54, second: 32, millisecond: 123}).getTime()).toEqual(1672296872123)
        expect(createUTCDate({year: 2022, month: 12, day: 29, hour: 0, minute: 0, second: 0, millisecond: 0}).getTime()).toEqual(1672272000000)
    })
})