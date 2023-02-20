import {fromNanosToMillis, getDifferenceBetweenMillis, getHMSFromMillis, getLocalUTCTimezoneOffset, getMillisecondsFromStartOfDay, getStartOfDayMillisecondsByShiftFromToday, getStartOfTodayMilliseconds} from "./calculationDateUtils";
import {DAY_MILLIS} from "./dateConstants";

describe("DateTimeUtils", () => {
    it("getHMSFromMillis", () => {
        const fn = (fromDate: string, toDate: string) => getHMSFromMillis(new Date(toDate).getTime() - new Date(fromDate).getTime())
        expect(fn("2022-12-28T00:00:00", "2022-12-29T06:54:32")).toStrictEqual({milliseconds: 0, seconds: 32, minutes: 54, hours: 6, days: 1, millisecondsTotal: 111272000})

        const now = new Date().getTime()
        expect(getHMSFromMillis(now - now)).toStrictEqual({milliseconds: 0, seconds: 0, minutes: 0, hours: 0, days: 0, millisecondsTotal: 0})
        expect(getHMSFromMillis(123)).toStrictEqual({milliseconds: 123, seconds: 0, minutes: 0, hours: 0, days: 0, millisecondsTotal: 123})
        expect(getHMSFromMillis(325 + new Date("2022-12-29T06:54:32").getTime() - new Date("2022-12-28T00:00:00").getTime())).toStrictEqual({milliseconds: 325, seconds: 32, minutes: 54, hours: 6, days: 1, millisecondsTotal: 111272325})
    })

    it("getDifferenceBetweenMillis", () => {
        const fn = (fromDate: string, toDate: string) => getDifferenceBetweenMillis(new Date(fromDate).getTime(), new Date(toDate).getTime())
        expect(fn("2022-12-28T00:00:00", "2022-12-29T06:54:32")).toStrictEqual({milliseconds: 0, seconds: 32, minutes: 54, hours: 6, days: 1, millisecondsTotal: 111272000})
        expect(fn("2022-12-28T00:00:00", "2022-12-28T02:00:00")).toStrictEqual({milliseconds: 0, seconds: 0, minutes: 0, hours: 2, days: 0, millisecondsTotal: 7200000})
    })

    it("getMillisecondsFromStartOfDay", () => {
        const startOfToday = getStartOfTodayMilliseconds()
        expect(getMillisecondsFromStartOfDay(startOfToday + 123)).toStrictEqual(123)
    })

    it("fromNanosToMillis", () => {
        expect(fromNanosToMillis(BigInt(2_600_000))).toStrictEqual(2)
    })

    it("getStartOfDayMillisecondsByShiftFromToday", () => {
        const mockedDate = new Date("2022-12-29T06:54:32")
        const mockedDateDayStart = new Date("2022-12-29T00:00:00Z")
        const mockedDateDayStartMillis = mockedDateDayStart.getTime()
        jest.spyOn(global, 'Date').mockImplementation(() => mockedDate as any);
        const fn = (shiftByDays: number) => getStartOfDayMillisecondsByShiftFromToday(shiftByDays)

        expect(fn(0)).toStrictEqual(mockedDateDayStartMillis)
        expect(fn(1)).toStrictEqual(mockedDateDayStartMillis - DAY_MILLIS)

        jest.spyOn(global, 'Date').mockRestore();
    })

    it("getLocalUTCTimezoneOffset", () => {
        expect(getLocalUTCTimezoneOffset()).toEqual("+02:00")
    })

})