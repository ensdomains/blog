/* eslint-disable unicorn/no-empty-file */
module.exports = {
    plugins: {
        tailwindcss: {},
        'postcss-focus-visible': {
            replaceWith: '[data-focus-visible-added]',
        },
        autoprefixer: {},
    },
};
