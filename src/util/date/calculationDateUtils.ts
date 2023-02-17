import {DAY_MILLIS, NANOS_IN_MILLIS} from "./dateConstants";
import {now} from "./dateUtils";

/**
 * Convert nanoseconds to milliseconds.
 * @param value The value in nanoseconds.
 * @return {number} The value in milliseconds.
 */
export const fromNanosToMillis = (value: bigint): number => Math.floor(Number(value) / NANOS_IN_MILLIS)

type DateHMS = {
    milliseconds: number
    seconds: number
    minutes: number
    hours: number
    days: number
}
/**
 * Calculate length of time in milliseconds and present it in a human-readable format.
 * @param milliseconds The length of time in milliseconds.
 * @return {DateHMS} The length of time in human-readable format.
 */
export const getHMSFromMillis = (milliseconds: number): DateHMS => {
    const days = Math.floor(milliseconds / DAY_MILLIS)
    const millisFromDayStart = milliseconds % DAY_MILLIS
    const secondsFromDayStart = millisFromDayStart / 1000
    const hours = Math.floor(secondsFromDayStart / 3600)
    const minutes = Math.floor((secondsFromDayStart % 3600) / 60)
    const seconds = Math.floor(secondsFromDayStart % 60)
    const millisecondsFromSeconds = millisFromDayStart % 1000
    return {
        days,
        hours,
        minutes,
        seconds,
        milliseconds: millisecondsFromSeconds,
    }
}

/**
 * Calculate the difference between two dates in milliseconds and present it in a human-readable format.
 * Calculation is done using `getHMSFromMillis` function.
 * @param fromMillis The start date in milliseconds.
 * @param toMillis The end date in milliseconds.
 * @return {DateHMS} The difference in milliseconds.
 * @see getHMSFromMillis
 */
export const getDifferenceBetweenMillis = (fromMillis: number, toMillis: number): DateHMS => {
    const diffMilliseconds = toMillis - fromMillis
    return getHMSFromMillis(diffMilliseconds)
}

/**
 * Get the start of the day in milliseconds.
 * @param timeMillis The time in milliseconds.
 * @return {number} The start of the day in milliseconds.
 */
export const getStartOfDayMilliseconds = (timeMillis: number): number => timeMillis - (timeMillis % DAY_MILLIS)

/**
 * Get the end of the day in milliseconds.
 * @param timeMillis The time in milliseconds.
 * @return {number} The end of the day in milliseconds.
 */
export const getEndOfDayMilliseconds = (timeMillis: number): number => timeMillis - (timeMillis % DAY_MILLIS) + DAY_MILLIS - 1

/**
 * Get the start of the today in milliseconds.
 * @return {number} The start of the today in milliseconds.
 */
export const getStartOfTodayMilliseconds = (): number => getStartOfDayMilliseconds(now())

/**
 * Get milliseconds from the start of the day by the time in milliseconds.
 * @param timeMillis The time in milliseconds.
 */
export const getMillisecondsFromStartOfDay = (timeMillis: number): number => timeMillis % DAY_MILLIS

/**
 * Get the start of the day in milliseconds by shift from today.
 * Shift is a number of days from today. Positive number means past, negative number means future.
 * @param shift The number of days from today. Value "1" means yesterday, value "7" means a week ago. Value "-1" means tomorrow, value "-7" means a week later.
 */
export const getStartOfDayMillisecondsByShiftFromToday = (shift: number): number => {
    const today = getStartOfTodayMilliseconds()
    return today - shift * DAY_MILLIS
}

/**
 * Check if the time is today.
 * @param timeMillis The time in milliseconds.
 */
export const isToday = (timeMillis: number) => getStartOfDayMilliseconds(timeMillis) == getStartOfTodayMilliseconds()

/**
 * Return current UTC timezone.
 * Example: "+02:00" for Riga, Latvia.
 * @return {string} The current UTC timezone.
 * @see https://stackoverflow.com/questions/1091372/getting-the-clients-timezone-in-javascript
 */
export const getLocalUTCTimezoneOffset = (date: Date = new Date()): string => {
    const offset = date.getTimezoneOffset();
    const sign = offset < 0 ? '+' : '-';
    const hours = Math.floor(Math.abs(offset) / 60).toString().padStart(2, '0');
    const minutes = (Math.abs(offset) % 60).toString().padStart(2, '0');
    return `${sign}${hours}:${minutes}`;
};