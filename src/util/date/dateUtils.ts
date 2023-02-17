/**
 * Return the current time in milliseconds
 */
export const now = () => new Date().getTime();

export type CreateUTCDateParameters = {
    year: number,
    month: number,
    day: number,
    hour?: number,
    minute?: number,
    second?: number
    millisecond?: number
}
/**
 * Create a UTC date
 * @param {CreateUTCDateParameters} parameters. Default values: hour = 0, minute = 0, second = 0, millisecond = 0.
 * @returns {Date} UTC date
 * @example createUTCDate({year: 2022, month: 12, day: 29, hour: 6, minute: 54, second: 32, millisecond: 123}) => 1672296872123 / "2022-12-29T06:54:32.123Z"
 */
export const createUTCDate = (parameters: CreateUTCDateParameters) => {
    const {year, month, day, hour = 0, minute = 0, second = 0, millisecond = 0} = parameters;
    const date = new Date(Date.UTC(year, month - 1, day, hour, minute, second));
    date.setUTCHours(hour, minute, second, millisecond);
    return date
}