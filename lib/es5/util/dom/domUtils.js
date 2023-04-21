"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scrollToTop = exports.preloadImage = void 0;
/**
 * Preload an image by creating a new Image object and setting its src.
 * @param {string} src The image source.
 */
const preloadImage = (src) => {
    new Image().src = src;
};
exports.preloadImage = preloadImage;
/**
 * Scroll to top of the page. This is useful when you want to scroll to the top of the page after a route change.
 */
const scrollToTop = () => setTimeout(() => window.scrollTo({ top: 0 }), 0);
exports.scrollToTop = scrollToTop;
//# sourceMappingURL=domUtils.js.map