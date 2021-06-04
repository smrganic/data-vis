import { scaleBand, scaleLinear } from "d3-scale"
import { Decades } from "./constants/performerInfoGroup/circle"
import { Width } from "./constants/svg"

const data = require("../../public/data/eurovisionData.json")

export const circleScaleLowerRange = 120
export const circleScaleUpperRange = Width / 2 - circleScaleLowerRange

// 1950 - 2021
export const domain = [Decades[0], data[data.length - 1].year]

export const xScale = scaleBand()
  .range([Math.PI / 2 + 0.04, Math.PI / 2 + 2 * Math.PI - 0.1]) // This adds a small gap that is filled with year text
  .align(0)
  .domain(data.map((singleElement: any) => singleElement.id))

export const yScale = scaleLinear()
  .range([circleScaleLowerRange, circleScaleUpperRange])
  .domain(domain)
