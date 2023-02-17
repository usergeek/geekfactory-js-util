import {truncateMiddle} from "./stringUtils";

describe("StringUtils", () => {
    it("truncateMiddle", () => {
        expect(truncateMiddle("", 5)).toEqual("")
        expect(truncateMiddle("Hello", 5)).toEqual("Hello")
        expect(truncateMiddle("Hello World", -1)).toEqual("...")
        expect(truncateMiddle("Hello World", 0)).toEqual("...")
        expect(truncateMiddle("Hello World", 3)).toEqual("...")
        expect(truncateMiddle("Hello World", 4)).toEqual("H...")
        expect(truncateMiddle("Hello World", 5)).toEqual("H...d")
        expect(truncateMiddle("Hello World", 6)).toEqual("He...d")
        expect(truncateMiddle("Hello World", 7)).toEqual("He...ld")
    })
})