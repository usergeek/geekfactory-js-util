import {formatMemoryShort} from "./formatMemoryUtils"
import {BYTES_IN_GB} from "./memoryConstants";

describe("FormatMemoryUtils", () => {
    it("formatMemoryShort", () => {
        const getValue = (value: number | bigint): string => formatMemoryShort(value, Math.abs(Number(value)) >= BYTES_IN_GB ? 3 : 0)

        expect(getValue(0)).toStrictEqual("0 B")
        expect(getValue(0.123456789)).toStrictEqual("0 B")
        expect(getValue(0.987654321)).toStrictEqual("1 B")

        expect(getValue(1)).toStrictEqual("1 B")

        expect(getValue(10)).toStrictEqual("10 B")

        expect(getValue(100)).toStrictEqual("100 B")

        expect(getValue(1_024 - 1)).toStrictEqual("1023 B")
        expect(getValue(1_024)).toStrictEqual("1 KiB")
        expect(getValue(1_024 + 1)).toStrictEqual("1 KiB")
        expect(getValue(1_535)).toStrictEqual("1 KiB")
        expect(getValue(1_536)).toStrictEqual("2 KiB")
        expect(getValue(1_024 * 2)).toStrictEqual("2 KiB")
        expect(getValue(1_024 * 3)).toStrictEqual("3 KiB")

        expect(getValue(1_024 * 10)).toStrictEqual("10 KiB")

        expect(getValue(1_024 * 100)).toStrictEqual("100 KiB")
        expect(getValue(1_024 * 123)).toStrictEqual("123 KiB")

        expect(getValue(1_024 * 1_000)).toStrictEqual("1000 KiB")
        expect(getValue(Math.pow(1_024, 2) - 1)).toStrictEqual("1024 KiB")
        expect(getValue(Math.pow(1_024, 2))).toStrictEqual("1 MiB")
        expect(getValue(Math.pow(1_024, 2) + 1)).toStrictEqual("1 MiB")
        expect(getValue(Math.pow(1_024, 2) * 2)).toStrictEqual("2 MiB")
        expect(getValue(Math.pow(1_024, 2) * 2.5 - 1)).toStrictEqual("2 MiB")
        expect(getValue(Math.pow(1_024, 2) * 2.5)).toStrictEqual("3 MiB")
        expect(getValue(123_456_789)).toStrictEqual("118 MiB")
        expect(getValue(987_654_321)).toStrictEqual("942 MiB")

        expect(getValue(Math.pow(1_024, 3) - (Math.pow(1_024, 2) * 2))).toStrictEqual("1022 MiB")
        expect(getValue(Math.pow(1_024, 3))).toStrictEqual("1 GiB")
        expect(getValue(Math.pow(1_024, 3) + (Math.pow(1_024, 2) * 2))).toStrictEqual("1.002 GiB")
        expect(getValue(Math.pow(1_024, 3) + (Math.pow(1_024, 2) * 1_024 / 2))).toStrictEqual("1.5 GiB")

        expect(getValue(Math.pow(1_024, 4))).toStrictEqual("1 TiB")
    })
})