/**
 * Formats a string with the given arguments.
 * Arguments are specified by using the {name} or {obj.name} syntax. Property names can be nested.
 * If an argument is not found and options.leavePlaceholders is false, the placeholder is replaced with an empty string.
 * @param template The template string.
 * @param {Record<string, any>} args The arguments to use for formatting.
 * @param {FormatTemplateOptions} options The options for formatting. Defaults to {leavePlaceholders: false}.
 * @returns {string} The formatted string.
 * @example formatTemplate("Hello {name}", {name: "World"}) => "Hello World"
 * @example formatTemplate("Hello {user.name}", {user: {name: "World"}}) => "Hello World"
 * @example formatTemplate("Hello {user.name2}", {user: {name: "World"}}) => "Hello "
 * @example formatTemplate("Hello {user.name2}", {user: {name: "World"}}, {leavePlaceholders: true}) => "Hello {user.name2}"
 */
type FormatTemplateOptions = {
    leavePlaceholders?: boolean;
};
export declare const formatTemplate: (template: string, args?: Record<string, any>, options?: FormatTemplateOptions) => string;
export {};
