/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./src/**/*.{html,js,jsx}'],
    theme: {
        extend: {
            screens: {
                '3xl': '1700px'
            },
            keyframes: {
                shake: {
                    '0%': { transform: 'translate(1px, 1px) rotate(0deg)' },
                    '10%': { transform: 'translate(-1px, -2px) rotate(-1deg)' },
                    '20%': { transform: 'translate(-3px, 0px) rotate(1deg) ' },
                    '30%': { transform: 'translate(3px, 2px) rotate(0deg) ' },
                    '40%': { transform: 'translate(1px, -1px) rotate(1deg) ' },
                    '50%': { transform: 'translate(-1px, 2px) rotate(-1deg)' },
                    '60%': { transform: 'translate(-3px, 1px) rotate(0deg) ' },
                    '70%': { transform: 'translate(3px, 1px) rotate(-1deg)' },
                    '80%': { transform: 'translate(-1px, -1px) rotate(1deg)' },
                    '90%': { transform: 'translate(1px, 2px) rotate(0deg) ' },
                    '100%': { transform: 'translate(1px, -2px) rotate(-1deg)' }
                },
                wiggle: {
                    '0%, 100%': { transform: 'rotate(-1deg)' },
                    '50%': { transform: 'rotate(1deg)' }
                },
                pulse: {
                    '0%, 100%': {
                        opacity: '1'
                    },
                    '40%': {
                        opacity: '.4'
                    }
                }
            },
            animation: {
                wiggle: 'wiggle 0.75s ease-in-out infinite',
                pulse: 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                ping: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite'
            }
        }
    },
    plugins: [require('@tailwindcss/forms')]
};
