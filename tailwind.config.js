module.exports = {
    purge: [
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {},
    },
    variants: {
        extend: {
            filter: ['hover', 'focus'],
            brightness: ['hover', 'focus'],
        },
    },
    plugins: [require('@tailwindcss/custom-forms')],
}
