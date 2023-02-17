"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatTemplate = void 0;
const formatTemplate = (template, args, options) => {
    const { leavePlaceholders = false } = options || {};
    return template.replace(/{([^}]+)}/g, (match, key) => {
        const value = key.split('.').reduce((o, k) => o === null || o === void 0 ? void 0 : o[k], args);
        return value === undefined ? (leavePlaceholders ? match : '') : value;
    });
};
exports.formatTemplate = formatTemplate;
//# sourceMappingURL=formatStringUtils.js.map