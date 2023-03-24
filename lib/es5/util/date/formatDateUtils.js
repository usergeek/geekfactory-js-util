"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUTCZone = exports.formatDate = exports.DATE_FORMAT_STRING_TIME_SECONDS = exports.DATE_FORMAT_STRING_TIME_MINUTES = exports.DATE_FORMAT_STRING_DAY_TIME_MILLIS = exports.DATE_FORMAT_STRING_DAY_TIME_SECONDS = exports.DATE_FORMAT_STRING_DAY_TIME_MINUTES = exports.DATE_FORMAT_STRING_DAY = exports.formatDateHMS = void 0;
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const dateUtils_1 = require("./dateUtils");
const formatDateHMSOptionsLocaleI18NShort = {
    dayOne: "d",
    dayMany: "d",
    hourOne: "h",
    hourMany: "h",
    minuteOne: "m",
    minuteMany: "m",
    secondOne: "s",
    secondMany: "s",
};
const formatDateHMSOptionsLocaleI18NLong = {
    dayOne: "day",
    dayMany: "days",
    hourOne: "hour",
    hourMany: "hours",
    minuteOne: "minute",
    minuteMany: "minutes",
    secondOne: "second",
    secondMany: "seconds",
};
/**
 * Format a DateHMS object to a human-readable string.
 * @param {DateHMS} hms The DateHMS object.
 * @param {FormatDateHMSOptions | undefined} options The options. Default: {separator: " ", tokenSeparator: " ", showZeroValues: false, withoutDetails: false, locale: {type: "long"}, futureValue: "now"}
 * @example formatDateHMS({days: 1, hours: 2, minutes: 3, seconds: 4, milliseconds: 5, millisecondsTotal: 900030004005}) // "1 day 2 hours 3 minutes 4 seconds 5 milliseconds"
 */
const formatDateHMS = (hms, options) => {
    const { separator = " ", tokenSeparator = " ", showZeroValues = false, withoutDetails = false, locale = { type: "long" }, futureValue = "now" } = options || {};
    const i18n = locale.type === "long" ? formatDateHMSOptionsLocaleI18NLong :
        locale.type === "short" ? formatDateHMSOptionsLocaleI18NShort : locale.i18n;
    if (hms.millisecondsTotal < 0) {
        return futureValue;
    }
    if (withoutDetails) {
        if (hms.days > 1) {
            return `${hms.days}${tokenSeparator}${i18n.dayMany}`;
        }
        if (hms.days == 1) {
            return `${hms.days}${tokenSeparator}${i18n.dayOne}`;
        }
        if (hms.hours > 1) {
            return `${hms.hours}${tokenSeparator}${i18n.hourMany}`;
        }
        if (hms.hours == 1) {
            return `${hms.hours}${tokenSeparator}${i18n.hourOne}`;
        }
        if (hms.minutes > 1) {
            return `${hms.minutes}${tokenSeparator}${i18n.minuteMany}`;
        }
        if (hms.minutes == 1) {
            return `${hms.minutes}${tokenSeparator}${i18n.minuteOne}`;
        }
        if (hms.seconds > 1) {
            return `${hms.seconds}${tokenSeparator}${i18n.secondMany}`;
        }
        if (hms.seconds == 1) {
            return `${hms.seconds}${tokenSeparator}${i18n.secondOne}`;
        }
        return `${hms.seconds}${tokenSeparator}${i18n.secondMany}`;
    }
    const result = [];
    if (hms.days > 0 || showZeroValues) {
        if (hms.days == 1) {
            result.push(`${hms.days}${tokenSeparator}${i18n.dayOne}`);
        }
        else {
            result.push(`${hms.days}${tokenSeparator}${i18n.dayMany}`);
        }
    }
    if (hms.hours > 0 || showZeroValues) {
        if (hms.hours == 1) {
            result.push(`${hms.hours}${tokenSeparator}${i18n.hourOne}`);
        }
        else {
            result.push(`${hms.hours}${tokenSeparator}${i18n.hourMany}`);
        }
    }
    if (hms.minutes > 0 || showZeroValues) {
        if (hms.minutes == 1) {
            result.push(`${hms.minutes}${tokenSeparator}${i18n.minuteOne}`);
        }
        else {
            result.push(`${hms.minutes}${tokenSeparator}${i18n.minuteMany}`);
        }
    }
    if (result.length === 0 || hms.seconds > 0 || showZeroValues) {
        if (hms.seconds == 1) {
            result.push(`${hms.seconds}${tokenSeparator}${i18n.secondOne}`);
        }
        else {
            result.push(`${hms.seconds}${tokenSeparator}${i18n.secondMany}`);
        }
    }
    return result.join(separator);
};
exports.formatDateHMS = formatDateHMS;
////////////////////////////////////////////////
// formatDate
////////////////////////////////////////////////
exports.DATE_FORMAT_STRING_DAY = "YYYY/MM/DD";
exports.DATE_FORMAT_STRING_DAY_TIME_MINUTES = "YYYY/MM/DD hh:mm a";
exports.DATE_FORMAT_STRING_DAY_TIME_SECONDS = "YYYY/MM/DD hh:mm:ss a";
exports.DATE_FORMAT_STRING_DAY_TIME_MILLIS = "YYYY/MM/DD hh:mm:ss.SSS a";
exports.DATE_FORMAT_STRING_TIME_MINUTES = "hh:mm a";
exports.DATE_FORMAT_STRING_TIME_SECONDS = "hh:mm:ss a";
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
const formatDate = (timeMillis, type, toLocalTime = false) => {
    switch (type) {
        case "day":
            return (0, moment_timezone_1.default)(timeMillis).local(!toLocalTime).format(exports.DATE_FORMAT_STRING_DAY);
        case "dayTimeMinutes":
            return (0, moment_timezone_1.default)(timeMillis).local(!toLocalTime).format(exports.DATE_FORMAT_STRING_DAY_TIME_MINUTES);
        case "dayTimeSeconds":
            return (0, moment_timezone_1.default)(timeMillis).local(!toLocalTime).format(exports.DATE_FORMAT_STRING_DAY_TIME_SECONDS);
        case "dayTimeMilliseconds":
            return (0, moment_timezone_1.default)(timeMillis).local(!toLocalTime).format(exports.DATE_FORMAT_STRING_DAY_TIME_MILLIS);
        case "timeOnlyMinutes":
            return (0, moment_timezone_1.default)(timeMillis).local(!toLocalTime).format(exports.DATE_FORMAT_STRING_TIME_MINUTES);
        case "timeOnlySeconds":
            return (0, moment_timezone_1.default)(timeMillis).local(!toLocalTime).format(exports.DATE_FORMAT_STRING_TIME_SECONDS);
        case "ago":
            return (0, moment_timezone_1.default)(timeMillis).local(!toLocalTime).fromNow();
    }
};
exports.formatDate = formatDate;
////////////////////////////////////////////////
// UTC Zone
////////////////////////////////////////////////
const formatUTCZone = (timeMillis) => {
    return (0, moment_timezone_1.default)(timeMillis).local(false).format("Z");
};
/**
 * Get the current UTC zone.
 */
exports.currentUTCZone = formatUTCZone((0, dateUtils_1.now)());
//# sourceMappingURL=formatDateUtils.js.map