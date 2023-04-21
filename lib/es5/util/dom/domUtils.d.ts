/// <reference types="node" />
/**
 * Preload an image by creating a new Image object and setting its src.
 * @param {string} src The image source.
 */
export declare const preloadImage: (src: string) => void;
/**
 * Scroll to top of the page. This is useful when you want to scroll to the top of the page after a route change.
 */
export declare const scrollToTop: () => NodeJS.Timeout;
