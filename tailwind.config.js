/** @type {import('tailwindcss').Config} */
export default {
   content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
   theme: {
      extend: {
         animation: {
				fade: 'fadeIn .5s ease-in-out',
			},

			keyframes: {
				fadeIn: {
					from: { opacity: 0 },
					to: { opacity: 1 },
				},
			},
         colors: {
            richblack: "#0d1b2a",
            oxfordblue: "#1b263b",
            yinblue: "#415a77",
            silverlakeblue: "#778da9",
            platinum: "#e0e1dd",
            indigodye: "#2E4059",
            frenchgrey: "#ACB7C3",
         },
      },
   },
   plugins: [],
};
