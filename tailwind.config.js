/** @type {import('tailwindcss').Config} */
// const fluid = require('fluid-tailwind')
import { Fluid } from './src/apps/extra/math'
const daisyui = require('daisyui')

module.exports = {
  content: ["./src/**/*.{html,js,pug}"],
  theme: {
    container: {
      center: true,
      screens: {
        DEFAULT: '100%', 
        xl: '1440px',    
      },
    },
    extend: {
      fontSize: {        
       xxl: [Fluid(2, 106)], 
      },      
    },
  },
  plugins: [
    daisyui
  ],
  corePlugins: {
    preflight: true, /** Ensure it's enabled */
  },
}
