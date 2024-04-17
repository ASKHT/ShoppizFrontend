/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primaryGreen: "#80c342",
                black: "#000000",
                white: "#ffffff",
                gray: "#d1d5db",
                darkGray: "#2f2f2f",
                ratingYellow: "#ebdf0b",
                wishlist: "#ff7eb3",
                notWishlist: "#d1d5db",
                error: "#ff0000",
            },
        },
    },
    plugins: [],
};
