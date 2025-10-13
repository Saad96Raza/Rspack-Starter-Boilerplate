export function Fluid(minSizeRem:number, maxSizeRem:number, minScreen = 320, maxScreen = 1440) {
  return `clamp(${minSizeRem}rem, calc(${minSizeRem}rem + (${maxSizeRem} - ${minSizeRem}) * ((100vw - ${minScreen}px) / (${maxScreen} - ${minScreen}))), ${maxSizeRem}rem)`;
}
