/**
 * Preload an image by creating a new Image object and setting its src.
 * @param {string} src The image source.
 */
export const preloadImage = (src: string) => {
    new Image().src = src
}

/**
 * Scroll to top of the page. This is useful when you want to scroll to the top of the page after a route change.
 */
export const scrollToTop = () => setTimeout(() => window.scrollTo({top: 0}), 0);