/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    blue: '#1A6BF6', // Warna biru khas header
                    bg: '#F3F6FA',   // Background abu-abu muda
                }
            }
        },
    },
    plugins: [],
}