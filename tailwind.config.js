/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  plugins: [require("daisyui"), require("@tailwindcss/typography")],
  darkTheme: false,
  darkMode: "false",
  themeRoot: ":root",
  daisyui: {
    base: true,
    themes: [
      {
        "doarPay": {
          "primary": "#076DF2",
          "secondary": "#52525b",
          "error": "#b91c1c",
        },
        "cobranca": {
          "primary": "#010812",
          "secondary": "#52525b",
          "error": "#b91c1c",
        },
        "cobrancaAlebank": {
          "primary": "#101d4d",
          "secondary": "#52525b",
          "error": "#b91c1c",
        },
        "sandbox": {
          "primary": "#9a3412",
          "secondary": "#ea580c",
          "error": "#b91c1c",
        },
        "univolter": {
          "primary": "#001235",
          "secondary": "#ea580c",
          "error": "#b91c1c",
        }
      },
      "doarPay",
      "cobranca",
      "univolter",
      "cobrancaAlebank",
    ],
  },

  logs: true,
}
