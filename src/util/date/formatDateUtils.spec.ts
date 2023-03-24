import Moment from "moment-timezone";
import {currentUTCZone, formatDate, formatDateHMS, FormatDateHMSOptions, FormatDateType} from "./formatDateUtils";
import {DAY_MILLIS, DAY_SECONDS} from "./dateConstants";
import {calculateDateYMHMS, getHMSFromMillis} from "./calculationDateUtils";

describe("FormatDateUtils", () => {

    describe("formatDateHMS", () => {
        const fn = (fromDate: string, toDate: string, options?: FormatDateHMSOptions) => formatDateHMS(getHMSFromMillis(new Date(toDate).getTime() - new Date(fromDate).getTime()), options)
        it("formatDateHMS:long", () => {
            const localFn = (fromDate: string, toDate: string) => fn(fromDate, toDate)
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:00:00")).toEqual("0 seconds")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:00:01")).toEqual("1 second")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:00:02")).toEqual("2 seconds")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:01:00")).toEqual("1 minute")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:02:00")).toEqual("2 minutes")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T01:00:00")).toEqual("1 hour")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T02:00:00")).toEqual("2 hours")
            expect(localFn("2023-03-21T00:00:00", "2023-03-22T00:00:00")).toEqual("1 day")
            expect(localFn("2023-03-21T00:00:00", "2023-03-23T00:00:00")).toEqual("2 days")
            expect(localFn("2023-03-21T00:00:00", "2023-03-22T01:01:01")).toEqual("1 day 1 hour 1 minute 1 second")
            expect(localFn("2023-03-21T00:00:00", "2023-03-23T02:02:02")).toEqual("2 days 2 hours 2 minutes 2 seconds")
        })
        it("formatDateHMS:short", () => {
            const localFn = (fromDate: string, toDate: string) => fn(fromDate, toDate, {locale: {type: "short"}})
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:00:00")).toEqual("0 s")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:00:01")).toEqual("1 s")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:00:02")).toEqual("2 s")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:01:00")).toEqual("1 m")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:02:00")).toEqual("2 m")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T01:00:00")).toEqual("1 h")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T02:00:00")).toEqual("2 h")
            expect(localFn("2023-03-21T00:00:00", "2023-03-22T00:00:00")).toEqual("1 d")
            expect(localFn("2023-03-21T00:00:00", "2023-03-23T00:00:00")).toEqual("2 d")
            expect(localFn("2023-03-21T00:00:00", "2023-03-22T01:01:01")).toEqual("1 d 1 h 1 m 1 s")
            expect(localFn("2023-03-21T00:00:00", "2023-03-23T02:02:02")).toEqual("2 d 2 h 2 m 2 s")
        })
        it("formatDateHMS:custom", () => {
            const localFn = (fromDate: string, toDate: string) => fn(fromDate, toDate, {
                locale: {
                    type: "custom",
                    i18n: {
                        dayOne: "DAY",
                        dayMany: "DAYS",
                        hourOne: "HOUR",
                        hourMany: "HOURS",
                        minuteOne: "MINUTE",
                        minuteMany: "MINUTES",
                        secondOne: "SECOND",
                        secondMany: "SECONDS",
                    }
                }
            })
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:00:00")).toEqual("0 SECONDS")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:00:01")).toEqual("1 SECOND")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:00:02")).toEqual("2 SECONDS")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:01:00")).toEqual("1 MINUTE")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:02:00")).toEqual("2 MINUTES")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T01:00:00")).toEqual("1 HOUR")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T02:00:00")).toEqual("2 HOURS")
            expect(localFn("2023-03-21T00:00:00", "2023-03-22T00:00:00")).toEqual("1 DAY")
            expect(localFn("2023-03-21T00:00:00", "2023-03-23T00:00:00")).toEqual("2 DAYS")
            expect(localFn("2023-03-21T00:00:00", "2023-03-22T01:01:01")).toEqual("1 DAY 1 HOUR 1 MINUTE 1 SECOND")
            expect(localFn("2023-03-21T00:00:00", "2023-03-23T02:02:02")).toEqual("2 DAYS 2 HOURS 2 MINUTES 2 SECONDS")
        })
        it("formatDateHMS:showZeroValues", () => {
            const localFn = (fromDate: string, toDate: string) => fn(fromDate, toDate, {showZeroValues: true})
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:00:00")).toEqual("0 days 0 hours 0 minutes 0 seconds")
            expect(localFn("2023-03-21T00:00:00", "2023-03-22T01:01:01")).toEqual("1 day 1 hour 1 minute 1 second")
            expect(localFn("2023-03-21T00:00:00", "2023-03-23T02:02:02")).toEqual("2 days 2 hours 2 minutes 2 seconds")
        })
        it("formatDateHMS:separators", () => {
            const localFn = (fromDate: string, toDate: string) => fn(fromDate, toDate, {tokenSeparator: "", separator: "_"})
            expect(localFn("2023-03-21T00:00:00", "2023-03-22T01:01:01")).toEqual("1day_1hour_1minute_1second")
        })
        it("formatDateHMS:future", () => {
            expect(fn("2023-03-21T00:00:00", "2023-03-20T23:59:59")).toEqual("now")
            expect(fn("2023-03-21T00:00:00", "2023-03-20T23:59:59", {futureValue: "NOW"})).toEqual("NOW")
        })
        it("formatDateHMS:withoutDetails", () => {
            const localFn = (fromDate: string, toDate: string) => fn(fromDate, toDate, {withoutDetails: true})
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:00:00")).toEqual("0 seconds")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:00:01")).toEqual("1 second")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:00:02")).toEqual("2 seconds")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:01:01")).toEqual("1 minute")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:02:02")).toEqual("2 minutes")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T01:01:01")).toEqual("1 hour")
            expect(localFn("2023-03-21T00:00:00", "2023-03-21T02:02:02")).toEqual("2 hours")
            expect(localFn("2023-03-21T00:00:00", "2023-03-22T01:01:01")).toEqual("1 day")
            expect(localFn("2023-03-21T00:00:00", "2023-03-23T02:02:02")).toEqual("2 days")
        })
    })

    describe("formatDate", () => {
        const fn = (dateString: string, type: FormatDateType, plusMillis?: number) => formatDate(new Date(dateString).getTime() + (plusMillis || 0), type, false)
        it("day", () => {
            const localFn = (dateString: string) => fn(dateString, "day")
            expect(localFn("2023-03-21T00:00:00")).toEqual("2023/03/21")
            expect(localFn("2023-01-01T00:00:00")).toEqual("2023/01/01")
        })
        it("dayTimeMinutes", () => {
            const localFn = (dateString: string) => fn(dateString, "dayTimeMinutes")
            expect(localFn("2023-03-21T00:00:00")).toEqual("2023/03/21 12:00 am")
            expect(localFn("2023-03-21T23:59:59")).toEqual("2023/03/21 11:59 pm")
        })
        it("dayTimeSeconds", () => {
            const localFn = (dateString: string) => fn(dateString, "dayTimeSeconds")
            expect(localFn("2023-03-21T00:00:00")).toEqual("2023/03/21 12:00:00 am")
            expect(localFn("2023-03-21T23:59:59")).toEqual("2023/03/21 11:59:59 pm")
        })
        it("dayTimeMilliseconds", () => {
            const localFn = (dateString: string, plusMillis?: number) => fn(dateString, "dayTimeMilliseconds", plusMillis)
            expect(localFn("2023-03-21T00:00:00")).toEqual("2023/03/21 12:00:00.000 am")
            expect(localFn("2023-03-21T23:59:59")).toEqual("2023/03/21 11:59:59.000 pm")
            expect(localFn("2023-03-21T00:00:00", 123)).toEqual("2023/03/21 12:00:00.123 am")
            expect(localFn("2023-03-21T23:59:59", 123)).toEqual("2023/03/21 11:59:59.123 pm")
        })
        it("timeOnlyMinutes", () => {
            const localFn = (dateString: string) => fn(dateString, "timeOnlyMinutes")
            expect(localFn("2023-03-21T00:00:00")).toEqual("12:00 am")
            expect(localFn("2023-03-21T23:59:59")).toEqual("11:59 pm")
        })
        it("timeOnlySeconds", () => {
            const localFn = (dateString: string) => fn(dateString, "timeOnlySeconds")
            expect(localFn("2023-03-21T00:00:00")).toEqual("12:00:00 am")
            expect(localFn("2023-03-21T23:59:59")).toEqual("11:59:59 pm")
        })
        describe("ago", () => {
            const getMoment = (dateString: string) => Moment(new Date(dateString).getTime())
            it("", () => {
                const localFn = (dateString: string) => fn(dateString, "ago")
                expect(localFn(new Date(new Date().getTime() - DAY_MILLIS * 4).toISOString())).toEqual("4 days ago")
            })

            it("future", () => {
                const localFn = (from: string, to: string) => getMoment(to).from(getMoment(from))
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:00:00")).toEqual("a few seconds ago")
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:00:01")).toEqual("in a few seconds")
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:00:02")).toEqual("in a few seconds")
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:00:45")).toEqual("in a minute")
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:01:00")).toEqual("in a minute")
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:02:00")).toEqual("in 2 minutes")
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:05:00")).toEqual("in 5 minutes")
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:30:00")).toEqual("in 30 minutes")
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:45:00")).toEqual("in an hour")
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T01:00:00")).toEqual("in an hour")
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T02:00:00")).toEqual("in 2 hours")
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T15:00:00")).toEqual("in 15 hours")
                expect(localFn("2023-03-21T00:00:00", "2023-03-22T00:00:00")).toEqual("in a day")
                expect(localFn("2023-03-21T00:00:00", "2023-03-22T08:00:00")).toEqual("in a day")
                expect(localFn("2023-03-21T00:00:00", "2023-03-22T23:00:00")).toEqual("in 2 days")
                expect(localFn("2023-03-21T00:00:00", "2023-04-21T00:00:00")).toEqual("in a month")
                expect(localFn("2023-03-21T00:00:00", "2023-06-21T00:00:00")).toEqual("in 3 months")
                expect(localFn("2023-03-21T00:00:00", "2024-03-21T00:00:00")).toEqual("in a year")
            })
            it("past", () => {
                const localFn = (to: string, from: string) => getMoment(to).from(getMoment(from), false)
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:00:00")).toEqual("a few seconds ago")
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:00:01")).toEqual("a few seconds ago")
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:00:02")).toEqual("a few seconds ago")
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:00:45")).toEqual("a minute ago")
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:01:00")).toEqual("a minute ago")
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:02:00")).toEqual("2 minutes ago")
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:05:00")).toEqual("5 minutes ago")
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:30:00")).toEqual("30 minutes ago")
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T00:45:00")).toEqual("an hour ago")
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T01:00:00")).toEqual("an hour ago")
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T02:00:00")).toEqual("2 hours ago")
                expect(localFn("2023-03-21T00:00:00", "2023-03-21T15:00:00")).toEqual("15 hours ago")
                expect(localFn("2023-03-21T00:00:00", "2023-03-22T00:00:00")).toEqual("a day ago")
                expect(localFn("2023-03-21T00:00:00", "2023-03-22T08:00:00")).toEqual("a day ago")
                expect(localFn("2023-03-21T00:00:00", "2023-03-22T23:00:00")).toEqual("2 days ago")
                expect(localFn("2023-03-21T00:00:00", "2023-04-21T00:00:00")).toEqual("a month ago")
                expect(localFn("2023-03-21T00:00:00", "2023-06-21T00:00:00")).toEqual("3 months ago")
                expect(localFn("2023-03-21T00:00:00", "2024-03-21T00:00:00")).toEqual("a year ago")
            })
        })
    })

    describe("UTC Zone", () => {
        it("currentUTCZone", () => {
            expect(currentUTCZone).toEqual("+02:00")
        })
    })

    describe("calculateDateYMHMS", () => {
        const mockedDate = new Date(Date.UTC(2023, 3, 24))
        jest.spyOn(global, 'Date').mockImplementation(() => mockedDate as any);

        const now = new Date().getTime()

        it("calculateDateYMHMS", () => {
            expect(calculateDateYMHMS(
                Date.UTC(2023, 1, 28),
                Date.UTC(2024, 1, 29) + 1
            )).toEqual({
                days: 0,
                daysToFullYear: 0,
                daysTotal: 366,
                hours: 0,
                hoursTotal: 366 * 24,
                milliseconds: 1,
                millisecondsTotal: 366 * DAY_MILLIS + 1,
                minutes: 0,
                minutesTotal: 366 * 24 * 60,
                months: 0,
                monthsTotal: 12,
                seconds: 0,
                secondsTotal: 366 * DAY_SECONDS,
                years: 1
            })

            expect(calculateDateYMHMS(
                now,
                now + 252470800000
            )).toEqual({
                days: 0,
                daysToFullYear: 0,
                daysTotal: 365 * 8 + 2,/*2 leap years*/
                hours: 2,
                hoursTotal: 70130,
                milliseconds: 0,
                millisecondsTotal: 252470800000,
                minutes: 46,
                minutesTotal: 4207846,
                months: 0,
                monthsTotal: 96,
                seconds: 40,
                secondsTotal: 252470800,
                years: 8
            });

            (() => {
                const years = 6
                const months = 2
                const monthsTotal = 74
                const days = 20
                const daysToFullYear = 81
                const daysTotal = 365 * years + daysToFullYear + 2;/*2 leap years*/
                const hours = 12
                const hoursTotal = daysTotal * 24 + hours
                const minutes = 13
                const minutesTotal = hoursTotal * 60 + minutes
                const seconds = 38
                const secondsTotal = minutesTotal * 60 + seconds
                const milliseconds = 360
                const millisecondsTotal = secondsTotal * 1000 + milliseconds
                expect(calculateDateYMHMS(
                    now,
                    now + 196431218360
                )).toEqual({
                    days,
                    daysToFullYear,
                    daysTotal,
                    hours,
                    hoursTotal,
                    milliseconds,
                    millisecondsTotal,
                    minutes,
                    minutesTotal,
                    months,
                    monthsTotal,
                    seconds,
                    secondsTotal,
                    years,
                });
            })();

            (() => {
                const daysTotal = 1
                const hoursTotal = daysTotal * 24 + 1
                const minutesTotal = hoursTotal * 60 + 1
                const secondsTotal = minutesTotal * 60 + 1
                const millisecondsTotal = secondsTotal * 1000 + 1
                expect(calculateDateYMHMS(
                    Date.UTC(2023, 1, 1),
                    Date.UTC(2023, 1, 2, 1, 1, 1, 1),
                )).toEqual({
                    days: 1,
                    daysToFullYear: daysTotal,
                    daysTotal,
                    hours: 1,
                    hoursTotal,
                    milliseconds: 1,
                    millisecondsTotal,
                    minutes: 1,
                    minutesTotal,
                    months: 0,
                    monthsTotal: 0,
                    seconds: 1,
                    secondsTotal,
                    years: 0
                })
            })();

            (() => {
                const daysTotal = 32
                const hoursTotal = daysTotal * 24 + 1
                const minutesTotal = hoursTotal * 60 + 1
                const secondsTotal = minutesTotal * 60 + 1
                const millisecondsTotal = secondsTotal * 1000 + 1
                expect(calculateDateYMHMS(
                    Date.UTC(2023, 0, 1),
                    Date.UTC(2023, 1, 2, 1, 1, 1, 1),
                )).toEqual({
                    days: 1,
                    daysToFullYear: daysTotal,
                    daysTotal: daysTotal,
                    hours: 1,
                    hoursTotal: hoursTotal,
                    milliseconds: 1,
                    millisecondsTotal: millisecondsTotal,
                    minutes: 1,
                    minutesTotal: minutesTotal,
                    months: 1,
                    monthsTotal: 1,
                    seconds: 1,
                    secondsTotal: secondsTotal,
                    years: 0
                })
            })();

            (() => {
                const daysTotal = 32
                const hoursTotal = daysTotal * 24 + 1
                const minutesTotal = hoursTotal * 60 + 1
                const secondsTotal = minutesTotal * 60 + 1
                const millisecondsTotal = secondsTotal * 1000 + 1
                expect(calculateDateYMHMS(
                    Date.UTC(2023, 1, 2, 1, 1, 1, 1),
                    Date.UTC(2023, 0, 1),
                )).toEqual({
                    days: -1,
                    daysToFullYear: -daysTotal,
                    daysTotal: -daysTotal,
                    hours: -1,
                    hoursTotal: -hoursTotal,
                    milliseconds: -1,
                    millisecondsTotal: -millisecondsTotal,
                    minutes: -1,
                    minutesTotal: -minutesTotal,
                    months: -1,
                    monthsTotal: -1,
                    seconds: -1,
                    secondsTotal: -secondsTotal,
                    years: 0
                })
            })();

        })
        jest.spyOn(global, 'Date').mockRestore();
    })
})