import { jsonStringifyWithBigInt, jsonParseWithBigInt } from "./jsonUtils";

describe("JSONUtils", () => {
    
    it("jsonStringifyWithBigInt", () => {
        const getValue = (value: any): string => jsonStringifyWithBigInt(value)
        //test "getValue" function with different nested objects of different types
        expect(getValue(0)).toStrictEqual("0")
        expect(getValue(0.123456789)).toStrictEqual("0.123456789")

        expect(getValue("")).toStrictEqual("\"\"")
        expect(getValue("test")).toStrictEqual("\"test\"")

        expect(getValue(true)).toStrictEqual("true")
        expect(getValue(false)).toStrictEqual("false")

        expect(getValue(null)).toStrictEqual("null")
        expect(getValue(undefined)).toStrictEqual(undefined)

        expect(getValue([])).toStrictEqual("[]")
        expect(getValue([1, 2, 3])).toStrictEqual("[1,2,3]")

        expect(getValue({})).toStrictEqual("{}")
        expect(getValue({a: 1, b: 2, c: 3})).toStrictEqual("{\"a\":1,\"b\":2,\"c\":3}")
        expect(getValue({a: 1, b: BigInt(2), c: 3})).toStrictEqual("{\"a\":1,\"b\":\"2n\",\"c\":3}")

        expect(getValue([1, "2", true, null, undefined, [], {}])).toStrictEqual("[1,\"2\",true,null,null,[],{}]")
        expect(getValue([1, "2", true, null, undefined, [], {a: 1, b: BigInt(2), c: 3}])).toStrictEqual("[1,\"2\",true,null,null,[],{\"a\":1,\"b\":\"2n\",\"c\":3}]")

        const date = new Date()
        expect(getValue(date)).toStrictEqual(`"${date.toISOString()}"`)
        expect(getValue([date])).toStrictEqual(`["${date.toISOString()}"]`)
        expect(getValue({a: date})).toStrictEqual(`{"a":"${date.toISOString()}"}`)
    })

    it("jsonParseWithBigInt", () => {
        const getValue = (value: string | undefined): any => jsonParseWithBigInt(value)

        expect(getValue("0")).toStrictEqual(0)
        expect(getValue("0.123456789")).toStrictEqual(0.123456789)

        expect(getValue("\"\"")).toStrictEqual("")
        expect(getValue("\"test\"")).toStrictEqual("test")

        expect(getValue("true")).toStrictEqual(true)
        expect(getValue("false")).toStrictEqual(false)

        expect(getValue("null")).toStrictEqual(null)
        expect(() => getValue(undefined)).toThrow()

        expect(getValue("[]")).toStrictEqual([])
        expect(getValue("[1, 2, 3]")).toStrictEqual([1, 2, 3])

        expect(getValue("{}")).toStrictEqual({})
        expect(getValue("{\"a\":1,\"b\":2,\"c\":3}")).toStrictEqual({a: 1, b: 2, c: 3})
        expect(getValue("{\"a\":1,\"b\":\"2n\",\"c\":3}")).toStrictEqual({a: 1, b: BigInt(2), c: 3})

        expect(getValue("[1,\"2\",true,null,null,[],{}]")).toStrictEqual([1, "2", true, null, null, [], {}])
        expect(getValue("[1,\"2\",true,null,null,[],{\"a\":1,\"b\":\"2n\",\"c\":3}]")).toStrictEqual([1, "2", true, null, null, [], {a: 1, b: BigInt(2), c: 3}])

        const date = new Date()
        expect(getValue(`"${date.toISOString()}"`)).toStrictEqual(date.toISOString())
        expect(getValue(`["${date.toISOString()}"]`)).toStrictEqual([date.toISOString()])
        expect(getValue(`{"a":"${date.toISOString()}"}`)).toStrictEqual({a: date.toISOString()})
    })
});