import Moment from 'moment-timezone';
import {DateHMS} from "./calculationDateUtils";
import {now} from "./dateUtils";

////////////////////////////////////////////////
// formatDateHMS
////////////////////////////////////////////////

export type FormatDateHMSOptionsLocaleI18N = {
    dayOne: string
    dayMany: string
    hourOne: string
    hourMany: string
    minuteOne: string
    minuteMany: string
    secondOne: string
    secondMany: string
}
const formatDateHMSOptionsLocaleI18NShort = {
    dayOne: "d",
    dayMany: "d",
    hourOne: "h",
    hourMany: "h",
    minuteOne: "m",
    minuteMany: "m",
    secondOne: "s",
    secondMany: "s",
}
const formatDateHMSOptionsLocaleI18NLong = {
    dayOne: "day",
    dayMany: "days",
    hourOne: "hour",
    hourMany: "hours",
    minuteOne: "minute",
    minuteMany: "minutes",
    secondOne: "second",
    secondMany: "seconds",
}
export type FormatDateHMSOptionsLocale = { type: "long" } | { type: "short" } |
    {
        type: "custom"
        i18n: FormatDateHMSOptionsLocaleI18N
    }

export type FormatDateHMSOptions = {
    tokenSeparator?: string
    separator?: string
    showZeroValues?: boolean
    withoutDetails?: boolean
    locale?: FormatDateHMSOptionsLocale
    futureValue?: string
}
/**
 * Format a DateHMS object to a human-readable string.
 * @param {DateHMS} hms The DateHMS object.
 * @param {FormatDateHMSOptions | undefined} options The options. Default: {separator: " ", tokenSeparator: " ", showZeroValues: false, withoutDetails: false, locale: {type: "long"}, futureValue: "now"}
 * @example formatDateHMS({days: 1, hours: 2, minutes: 3, seconds: 4, milliseconds: 5, millisecondsTotal: 900030004005}) // "1 day 2 hours 3 minutes 4 seconds 5 milliseconds"
 */
export const formatDateHMS = (hms: DateHMS, options?: FormatDateHMSOptions): string => {
    const {separator = " ", tokenSeparator = " ", showZeroValues = false, withoutDetails = false, locale = {type: "long"}, futureValue = "now"} = options || {}

    const i18n: FormatDateHMSOptionsLocaleI18N = locale.type === "long" ? formatDateHMSOptionsLocaleI18NLong :
        locale.type === "short" ? formatDateHMSOptionsLocaleI18NShort : locale.i18n

    if (hms.millisecondsTotal < 0) {
        return futureValue
    }

    if (withoutDetails) {
        if (hms.days > 1) {
            return `${hms.days}${tokenSeparator}${i18n.dayMany}`
        }
        if (hms.days == 1) {
            return `${hms.days}${tokenSeparator}${i18n.dayOne}`
        }
        if (hms.hours > 1) {
            return `${hms.hours}${tokenSeparator}${i18n.hourMany}`
        }
        if (hms.hours == 1) {
            return `${hms.hours}${tokenSeparator}${i18n.hourOne}`
        }
        if (hms.minutes > 1) {
            return `${hms.minutes}${tokenSeparator}${i18n.minuteMany}`
        }
        if (hms.minutes == 1) {
            return `${hms.minutes}${tokenSeparator}${i18n.minuteOne}`
        }
        if (hms.seconds > 1) {
            return `${hms.seconds}${tokenSeparator}${i18n.secondMany}`
        }
        if (hms.seconds == 1) {
            return `${hms.seconds}${tokenSeparator}${i18n.secondOne}`
        }
        return `${hms.seconds}${tokenSeparator}${i18n.secondMany}`
    }
    const result: Array<string> = []
    if (hms.days > 0 || showZeroValues) {
        if (hms.days == 1) {
            result.push(`${hms.days}${tokenSeparator}${i18n.dayOne}`)
        } else {
            result.push(`${hms.days}${tokenSeparator}${i18n.dayMany}`)
        }
    }
    if (hms.hours > 0 || showZeroValues) {
        if (hms.hours == 1) {
            result.push(`${hms.hours}${tokenSeparator}${i18n.hourOne}`)
        } else {
            result.push(`${hms.hours}${tokenSeparator}${i18n.hourMany}`)
        }
    }
    if (hms.minutes > 0 || showZeroValues) {
        if (hms.minutes == 1) {
            result.push(`${hms.minutes}${tokenSeparator}${i18n.minuteOne}`)
        } else {
            result.push(`${hms.minutes}${tokenSeparator}${i18n.minuteMany}`)
        }
    }
    if (result.length === 0 || hms.seconds > 0 || showZeroValues) {
        if (hms.seconds == 1) {
            result.push(`${hms.seconds}${tokenSeparator}${i18n.secondOne}`)
        } else {
            result.push(`${hms.seconds}${tokenSeparator}${i18n.secondMany}`)
        }
    }

    return result.join(separator)
}

////////////////////////////////////////////////
// formatDate
////////////////////////////////////////////////

export const DATE_FORMAT_STRING_DAY = "YYYY/MM/DD"
export const DATE_FORMAT_STRING_DAY_TIME_MINUTES = "YYYY/MM/DD hh:mm a"
export const DATE_FORMAT_STRING_DAY_TIME_SECONDS = "YYYY/MM/DD hh:mm:ss a"
export const DATE_FORMAT_STRING_DAY_TIME_MILLIS = "YYYY/MM/DD hh:mm:ss.SSS a"
export const DATE_FORMAT_STRING_TIME_MINUTES = "hh:mm a"
export const DATE_FORMAT_STRING_TIME_SECONDS = "hh:mm:ss a"

export type FormatDateType = "day" | "dayTimeMinutes" | "dayTimeSeconds" | "dayTimeMilliseconds" | "timeOnlyMinutes" | "timeOnlySeconds" | "ago"

/**
 * Format a date to a string.
 * Format types:
 * - day: YYYY/MM/DD
 * - dayTimeMinutes: YYYY/MM/DD hh:mm a
 * - dayTimeSeconds: YYYY/MM/DD hh:mm:ss a
 * - dayTimeMilliseconds: YYYY/MM/DD hh:mm:ss.SSS a
 * - timeOnlyMinutes: hh:mm a
 * - timeOnlySeconds: hh:mm:ss a
 * - ago: 1 day ago, 2 hours ago, 3 minutes ago, 4 seconds ago
 * @param {number} timeMillis The time in milliseconds.
 * @param {FormatDateType} type The type of the date format.
 * @param {boolean} toLocalTime If true, the date will be converted to the local time. Default: false
 */
export const formatDate = (timeMillis: number, type: FormatDateType, toLocalTime: boolean = false): string => {
    switch (type) {
        case "day":
            return Moment(timeMillis).local(!toLocalTime).format(DATE_FORMAT_STRING_DAY)
        case "dayTimeMinutes":
            return Moment(timeMillis).local(!toLocalTime).format(DATE_FORMAT_STRING_DAY_TIME_MINUTES)
        case "dayTimeSeconds":
            return Moment(timeMillis).local(!toLocalTime).format(DATE_FORMAT_STRING_DAY_TIME_SECONDS)
        case "dayTimeMilliseconds":
            return Moment(timeMillis).local(!toLocalTime).format(DATE_FORMAT_STRING_DAY_TIME_MILLIS)
        case "timeOnlyMinutes":
            return Moment(timeMillis).local(!toLocalTime).format(DATE_FORMAT_STRING_TIME_MINUTES)
        case "timeOnlySeconds":
            return Moment(timeMillis).local(!toLocalTime).format(DATE_FORMAT_STRING_TIME_SECONDS)
        case "ago":
            return Moment(timeMillis).local(!toLocalTime).fromNow()
    }
};

////////////////////////////////////////////////
// UTC Zone
////////////////////////////////////////////////

const formatUTCZone = (timeMillis: number): string => {
    return Moment(timeMillis).local(false).format("Z")
};

/**
 * Get the current UTC zone.
 */
export const currentUTCZone = formatUTCZone(now())