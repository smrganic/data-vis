import { scaleBand } from "d3-scale"
import { decades } from "./constants/circle"
import { svgWidth } from "./constants/svg"

console.log(decades.map(String))

export const circleScale = scaleBand()
  .domain(decades.map(String))
  .range([50, svgWidth / 2])
