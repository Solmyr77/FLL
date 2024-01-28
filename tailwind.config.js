/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
   theme: {
      extend: {
         colors: {
            richblack: "#0d1b2a",
            oxfordblue: "#1b263b",
            yinblue: "#415a77",
            silverlakeblue: "#778da9",
            platinum: "#e0e1dd",
         },
      },
   },
   plugins: [],
};
