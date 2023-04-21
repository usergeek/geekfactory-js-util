import {DAY_MILLIS, NANOS_IN_MILLIS} from "./dateConstants";
import {now} from "./dateUtils";
import Moment from "moment-timezone";

/**
 * Convert nanoseconds to milliseconds.
 * @param value The value in nanoseconds.
 * @return {number} The value in milliseconds.
 */
export const fromNanosToMillis = (value: bigint): number => Math.floor(Number(value) / NANOS_IN_MILLIS)

export type DateHMS = {
    /**
     * Length of time: milliseconds part.
     */
    milliseconds: number
    /**
     * Length of time: seconds part.
     */
    seconds: number
    /**
     * Length of time: minutes part.
     */
    minutes: number
    /**
     * Length of time: hours part.
     */
    hours: number
    /**
     * Length of time: days part.
     */
    days: number
    /**
     * Total number of milliseconds.
     */
    millisecondsTotal: number
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
        millisecondsTotal: milliseconds,
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

////////////////////////////////////////////////
// Date YMHMS
////////////////////////////////////////////////

export type DateYMHMS = {
    /**
     * Length of time: milliseconds part.
     */
    milliseconds: number
    /**
     * Length of time: milliseconds total.
     */
    millisecondsTotal: number
    /**
     * Length of time: seconds part.
     */
    seconds: number
    /**
     * Length of time: seconds total.
     */
    secondsTotal: number
    /**
     * Length of time: minutes part.
     */
    minutes: number
    /**
     * Length of time: minutes total.
     */
    minutesTotal: number
    /**
     * Length of time: hours part.
     */
    hours: number
    /**
     * Length of time: hours total.
     */
    hoursTotal: number
    /**
     * Length of time: days part.
     */
    days: number
    /**
     * Length of time: how many days till full year.
     */
    daysToFullYear: number
    /**
     * Length of time: days total.
     */
    daysTotal: number
    /**
     * Length of time: months part.
     */
    months: number
    /**
     * Length of time: months total.
     */
    monthsTotal: number
    /**
     * Length of time: years part.
     */
    years: number
}

/**
 * Calculate the difference between two dates.
 * @param {number} timeStartMillis The start time in milliseconds.
 * @param {number} timeEndMillis The end time in milliseconds.
 */
export const calculateDateYMHMS = (timeStartMillis: number, timeEndMillis: number): DateYMHMS => {
    const endMoment = Moment(timeEndMillis);
    const startMoment = Moment(timeStartMillis);

    const precise: boolean = false

    const millisecondsTotal = timeEndMillis - timeStartMillis
    const years = endMoment.diff(startMoment, "years", precise)
    const monthsTotal = endMoment.diff(startMoment, "months", precise)

    const daysTotal = endMoment.diff(startMoment, "days", precise)
    const hoursTotal = endMoment.diff(startMoment, "hours", precise)
    const minutesTotal = endMoment.diff(startMoment, "minutes", precise)
    const secondsTotal = endMoment.diff(startMoment, "seconds", precise)

    if (Math.abs(years) > 0) {
        endMoment.subtract(years, "years")
    }
    const daysToFullYear = endMoment.diff(startMoment, "days", precise)

    const months = endMoment.diff(startMoment, "months", precise)
    if (Math.abs(months) > 0) {
        endMoment.subtract(months, "months")
    }

    const days = endMoment.diff(startMoment, "days", precise)
    if (Math.abs(days) > 0) {
        endMoment.subtract(days, "days")
    }

    const hours = endMoment.diff(startMoment, "hours", precise)
    if (Math.abs(hours) > 0) {
        endMoment.subtract(hours, "hours")
    }

    const minutes = endMoment.diff(startMoment, "minutes", precise)
    if (Math.abs(minutes) > 0) {
        endMoment.subtract(minutes, "minutes")
    }

    const seconds = endMoment.diff(startMoment, "seconds", precise)
    if (Math.abs(seconds) > 0) {
        endMoment.subtract(seconds, "seconds")
    }

    const milliseconds = endMoment.diff(startMoment, "milliseconds", precise)

    return {
        milliseconds,
        millisecondsTotal,
        seconds,
        secondsTotal,
        minutes,
        minutesTotal,
        hours,
        hoursTotal,
        days,
        daysToFullYear,
        daysTotal,
        months,
        monthsTotal,
        years,
    }
}

////////////////////////////////////////////////
// Moment
////////////////////////////////////////////////

/**
 * Returns the Moment object representing the time corresponding to the given time in milliseconds.
 * @param timeMillis
 */
export const getMomentFromMillis = (timeMillis: number): Moment.Moment => Moment(timeMillis)

/**
 * Returns the Moment object representing the current time.
 */
export const getMomentFromCurrentTime = (): Moment.Moment => Moment()

/**
 * Returns the Moment object representing the end of the day containing the current time (end of the today).
 */
export const getMomentFromCurrentEndOfDay = (): Moment.Moment => getMomentFromCurrentTime().endOf('day')
