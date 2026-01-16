/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Lato', 'sans-serif'],
                cookie: ['"Cookie"', 'cursive'],
                lato: ['Lato', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fade-in 0.3s ease-out',
                'scale-up': 'scale-up 0.2s ease-out',
                'bounce-in': 'bounce-in 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                'blob': 'blob 7s infinite',
            },
            keyframes: {
                'fade-in': {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
                'scale-up': {
                    from: { opacity: '0', transform: 'scale(0.95)' },
                    to: { opacity: '1', transform: 'scale(1)' },
                },
                'bounce-in': {
                    '0%': { opacity: '0', transform: 'translateX(100px)' },
                    '60%': { opacity: '1', transform: 'translateX(-10px)' },
                    '80%': { transform: 'translateX(5px)' },
                    '100%': { transform: 'translateX(0)' },
                },
                blob: {
                    '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
                    '25%': { transform: 'translate(20px, -20px) scale(1.1)' },
                    '50%': { transform: 'translate(-20px, 20px) scale(0.9)' },
                    '75%': { transform: 'translate(20px, 20px) scale(1.05)' },
                },
            },
        },
    },
    plugins: [],
}
