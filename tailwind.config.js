/** @type {import('tailwindcss').Config} */
/**
 * fluid function
 */
import { Fluid } from './src/apps/extra/math'
import daisyui from 'daisyui'

module.exports = {
  content: ["./src/**/*.{html,ts,pug}"],
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
        xxl: [Fluid(4, 200)], 
        xl: [], 
        lg: [], 
        md: [], 
        sm: [], 
        body: [], 
        input: [], 
        highlight: [], 
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
