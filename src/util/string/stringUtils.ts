/**
 * Truncates a string to the given length in the middle.
 * Resulting string will have the same length as the given length or no less than "ellipsis.length".
 * String.substring method is used.
 * @param {string} str The string to truncate.
 * @param {number} length The maximum length of the string.
 * @param {string} [ellipsis="..."] The string to use as ellipsis.
 * @returns {string} The truncated string.
 * @example truncateMiddle("", 5) => ""
 * @example truncateMiddle("Hello", 5) => "Hello"
 * @example truncateMiddle("Hello World", 5) => "H...d"
 * @example truncateMiddle("Hello World", 6) => "He...d"
 */
export const truncateMiddle = (str: string, length: number, ellipsis = "..."): string => {
    if (str.length <= length) {
        return str
    }
    const left = Math.ceil((length - ellipsis.length) / 2)
    const right = Math.floor((length - ellipsis.length) / 2)
    return str.substring(0, left) + ellipsis + str.substring(str.length - right)
}