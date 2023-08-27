/**
 * @see https://github.com/ensdomains/media-kit/blob/main/media/colors/tailwind.config.js
 */

const plugin = require('tailwindcss/plugin');

/* eslint-disable unicorn/no-empty-file */

/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
    content: [
        './{pages,app,content,src,mdx}/**/*.{js,mjs,jsx,mdx,tsx}',
        '../content/**/*.{mdx}',
    ],
    darkMode: 'class',
    plugins: [
        require('@tailwindcss/typography'),
        plugin(({ addVariant }) => {
            // Tailwind variant to allow for `interest-within` class that applies when the #search_open checkbox is checked
            addVariant('interest-within', [
                '#search_open[checked=true] ~ &',
                '#search_open[checked=true] ~ * > &',
                '#search_open[checked=true] ~ * * > &',
                ':merge(.group):focus-within &',
            ]);
        }),
    ],
    theme: {
        typography: require('./src/typography'),
        extend: {
            aspectRatio: {
                cover: '1920 / 1080',
            },
            colors: {
                ens: {
                    blue: '#5298FF',
                    blue2: 'rgba(82, 152, 255, 0.6)',
                    blue3: 'rgba(82, 152, 255, 0.25)',
                    green: '#49B393',
                    indigo: '#5854D6',
                    orange: '#FF9500',
                    pink: '#FF2D55',
                    purple: '#AF52DE',
                    red: '#D55555',
                    teal: '#5AC8FA',
                    yellow: '#E8B811',
                    grey1: '#F6F6F6',
                    grey2: '#9B9BA7',
                    grey3: '#454545',
                    'gradient-blue':
                        'linear-gradient(330.4deg, #44BCF0 4.54%, #7298F8 59.2%, #A099FF 148.85%)',
                    'gradient-purple':
                        'linear-gradient(323.31deg, #DE82FF -15.56%, #7F6AFF 108.43%)',
                    'gradient-green':
                        'linear-gradient(323.31deg, #73A6F2 -15.56%, #42C2AB 108.43%)',
                },
            },
            borderRadius: {
                ens: '16px',
            },
            screens: {
                xs: '448px',
            },
        },
    },
};
