import {formatTemplate} from "./formatStringUtils";

describe("StringFormatUtils", () => {
    it("formatTemplate", () => {
        expect(formatTemplate("Hello {name}", {name: "World"})).toEqual("Hello World")
        expect(formatTemplate("Hello {user.name}", {user: {name: "World"}})).toEqual("Hello World")
        expect(formatTemplate("Hello {user.name2}", {user: {name: "World"}})).toEqual("Hello ")
        expect(formatTemplate("Hello {user.name2} {user2.name}", {user: {name: "World"}}, {leavePlaceholders: true})).toEqual("Hello {user.name2} {user2.name}")
        expect(formatTemplate("{user.name2}", undefined, {leavePlaceholders: true})).toEqual("{user.name2}")
        expect(formatTemplate("{}",)).toEqual("{}")
        expect(formatTemplate("{}", undefined, {leavePlaceholders: true})).toEqual("{}")
    })
})