import { DateHMS } from "./calculationDateUtils";
export type FormatDateHMSOptionsLocaleI18N = {
    dayOne: string;
    dayMany: string;
    hourOne: string;
    hourMany: string;
    minuteOne: string;
    minuteMany: string;
    secondOne: string;
    secondMany: string;
};
export type FormatDateHMSOptionsLocale = {
    type: "long";
} | {
    type: "short";
} | {
    type: "custom";
    i18n: FormatDateHMSOptionsLocaleI18N;
};
export type FormatDateHMSOptions = {
    tokenSeparator?: string;
    separator?: string;
    showZeroValues?: boolean;
    withoutDetails?: boolean;
    locale?: FormatDateHMSOptionsLocale;
    futureValue?: string;
};
/**
 * Format a DateHMS object to a human-readable string.
 * @param {DateHMS} hms The DateHMS object.
 * @param {FormatDateHMSOptions | undefined} options The options. Default: {separator: " ", tokenSeparator: " ", showZeroValues: false, withoutDetails: false, locale: {type: "long"}, futureValue: "now"}
 * @example formatDateHMS({days: 1, hours: 2, minutes: 3, seconds: 4, milliseconds: 5, millisecondsTotal: 900030004005}) // "1 day 2 hours 3 minutes 4 seconds 5 milliseconds"
 */
export declare const formatDateHMS: (hms: DateHMS, options?: FormatDateHMSOptions) => string;
export declare const DATE_FORMAT_STRING_DAY = "YYYY/MM/DD";
export declare const DATE_FORMAT_STRING_DAY_TIME_MINUTES = "YYYY/MM/DD hh:mm a";
export declare const DATE_FORMAT_STRING_DAY_TIME_SECONDS = "YYYY/MM/DD hh:mm:ss a";
export declare const DATE_FORMAT_STRING_DAY_TIME_MILLIS = "YYYY/MM/DD hh:mm:ss.SSS a";
export declare const DATE_FORMAT_STRING_TIME_MINUTES = "hh:mm a";
export declare const DATE_FORMAT_STRING_TIME_SECONDS = "hh:mm:ss a";
export type FormatDateType = "day" | "dayTimeMinutes" | "dayTimeSeconds" | "dayTimeMilliseconds" | "timeOnlyMinutes" | "timeOnlySeconds" | "ago";
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
export declare const formatDate: (timeMillis: number, type: FormatDateType, toLocalTime?: boolean) => string;
/**
 * Get the current UTC zone.
 */
export declare const currentUTCZone: string;
