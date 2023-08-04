import Moment from "moment-timezone";
/**
 * Convert nanoseconds to milliseconds.
 * @param value The value in nanoseconds.
 * @return {number} The value in milliseconds.
 */
export declare const fromNanosToMillis: (value: bigint) => number;
export type DateHMS = {
    /**
     * Length of time: milliseconds part.
     */
    milliseconds: number;
    /**
     * Length of time: seconds part.
     */
    seconds: number;
    /**
     * Length of time: minutes part.
     */
    minutes: number;
    /**
     * Length of time: hours part.
     */
    hours: number;
    /**
     * Length of time: days part.
     */
    days: number;
    /**
     * Total number of milliseconds.
     */
    millisecondsTotal: number;
};
/**
 * Calculate length of time in milliseconds and present it in a human-readable format.
 * @param milliseconds The length of time in milliseconds.
 * @return {DateHMS} The length of time in human-readable format.
 */
export declare const getHMSFromMillis: (milliseconds: number) => DateHMS;
/**
 * Calculate the difference between two dates in milliseconds and present it in a human-readable format.
 * Calculation is done using `getHMSFromMillis` function.
 * @param fromMillis The start date in milliseconds.
 * @param toMillis The end date in milliseconds.
 * @return {DateHMS} The difference in milliseconds.
 * @see getHMSFromMillis
 */
export declare const getDifferenceBetweenMillis: (fromMillis: number, toMillis: number) => DateHMS;
/**
 * Get the start of the day in milliseconds.
 * @param timeMillis The time in milliseconds.
 * @return {number} The start of the day in milliseconds.
 */
export declare const getStartOfDayMilliseconds: (timeMillis: number) => number;
/**
 * Get the end of the day in milliseconds.
 * @param timeMillis The time in milliseconds.
 * @return {number} The end of the day in milliseconds.
 */
export declare const getEndOfDayMilliseconds: (timeMillis: number) => number;
/**
 * Get the start of the today in milliseconds.
 * @return {number} The start of the today in milliseconds.
 */
export declare const getStartOfTodayMilliseconds: () => number;
/**
 * Get milliseconds from the start of the day by the time in milliseconds.
 * @param timeMillis The time in milliseconds.
 */
export declare const getMillisecondsFromStartOfDay: (timeMillis: number) => number;
/**
 * Get the start of the day in milliseconds by shift from today.
 * Shift is a number of days from today. Positive number means past, negative number means future.
 * @param shift The number of days from today. Value "1" means yesterday, value "7" means a week ago. Value "-1" means tomorrow, value "-7" means a week later.
 */
export declare const getStartOfDayMillisecondsByShiftFromToday: (shift: number) => number;
/**
 * Transform time in milliseconds to the closest granularity in the past or future. E.g. get closest 5 minutes interval time in the past.
 * @param timeMillis time to transform
 * @param granularityMilliseconds granularity in milliseconds
 * @param direction direction to transform.
 * @return {number} time in milliseconds.
 * @example transformTimeMillisToClosestGranularity(1623345721000, 5 * 60 * 1000, "past") => 1623345600000
 * @example transformTimeMillisToClosestGranularity(1623345721000, 5 * 60 * 1000, "future") => 1623345900000
 */
export declare const transformTimeMillisToClosestGranularity: (timeMillis: number, granularityMilliseconds: number, direction?: "past" | "future") => number;
/**
 * Check if the time is today.
 * @param timeMillis The time in milliseconds.
 */
export declare const isToday: (timeMillis: number) => boolean;
/**
 * Return current UTC timezone.
 * Example: "+02:00" for Riga, Latvia.
 * @return {string} The current UTC timezone.
 * @see https://stackoverflow.com/questions/1091372/getting-the-clients-timezone-in-javascript
 */
export declare const getLocalUTCTimezoneOffset: (date?: Date) => string;
export type DateYMHMS = {
    /**
     * Length of time: milliseconds part.
     */
    milliseconds: number;
    /**
     * Length of time: milliseconds total.
     */
    millisecondsTotal: number;
    /**
     * Length of time: seconds part.
     */
    seconds: number;
    /**
     * Length of time: seconds total.
     */
    secondsTotal: number;
    /**
     * Length of time: minutes part.
     */
    minutes: number;
    /**
     * Length of time: minutes total.
     */
    minutesTotal: number;
    /**
     * Length of time: hours part.
     */
    hours: number;
    /**
     * Length of time: hours total.
     */
    hoursTotal: number;
    /**
     * Length of time: days part.
     */
    days: number;
    /**
     * Length of time: how many days till full year.
     */
    daysToFullYear: number;
    /**
     * Length of time: days total.
     */
    daysTotal: number;
    /**
     * Length of time: months part.
     */
    months: number;
    /**
     * Length of time: months total.
     */
    monthsTotal: number;
    /**
     * Length of time: years part.
     */
    years: number;
};
/**
 * Calculate the difference between two dates.
 * @param {number} timeStartMillis The start time in milliseconds.
 * @param {number} timeEndMillis The end time in milliseconds.
 */
export declare const calculateDateYMHMS: (timeStartMillis: number, timeEndMillis: number) => DateYMHMS;
/**
 * Returns the Moment object representing the time corresponding to the given time in milliseconds.
 * @param timeMillis
 */
export declare const getMomentFromMillis: (timeMillis: number) => Moment.Moment;
/**
 * Returns the Moment object representing the current time.
 */
export declare const getMomentFromCurrentTime: () => Moment.Moment;
/**
 * Returns the Moment object representing the end of the day containing the current time (end of the today).
 */
export declare const getMomentFromCurrentEndOfDay: () => Moment.Moment;
