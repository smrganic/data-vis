import { scaleBand } from "d3-scale"
import { decades } from "./constants/circle"
import { svgWidth } from "./constants/svg"

const data = require("../../public/data/eurovisionData.json")

export const circleScale = scaleBand()
  .domain(decades.map(String))
  .range([100, svgWidth / 2])

export const xScale = scaleBand()
  .range([0, 2 * Math.PI])
  .align(0)
  .domain(data.map((singleElement: any) => singleElement.id))
