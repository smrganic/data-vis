import { scaleBand } from "d3-scale"
import { decades, svgWidth } from "./constants"

let circleScale = scaleBand()
  .domain(decades.map(String))
  .range([0, svgWidth / 2])

export { circleScale }
