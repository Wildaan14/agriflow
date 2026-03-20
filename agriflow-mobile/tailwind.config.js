/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#635BFF", // Stripe Indigo
        secondary: "#00D924", // Stripe Emerald
        accent: "#0a2540", // Stripe Dark Blue
        warning: "#facc15",
        danger: "#be185d",
        surface: "#F6F9FC",
        text: {
          primary: "#0a2540",
          secondary: "#425466",
        },
        customBorder: "#E6EBF1",
      },
      borderRadius: {
        card: 8,
        modal: 12,
        pill: 24,
      },
    },
  },
  plugins: [],
};
