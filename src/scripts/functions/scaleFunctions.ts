import { scaleBand, scaleLinear } from "d3-scale"
import { Decades, TextMargin } from "../constants/performerInfoGroup/circle"
import * as performerConstants from "../constants/performerInfoGroup/performerGroup"
import { Width } from "../constants/svg"

const data = require("../../data/eurovisionData.json")

export const circleScaleLowerRange = Width * 0.125
export const circleScaleUpperRange = Width / 2 - circleScaleLowerRange

// 1950 - 2021
export const domain = [Decades[0], data[data.length - 1].year]

export const xScale = scaleBand() // Creates band of values for every id in dataset
  .range([Math.PI / 2 + 0.04, Math.PI / 2 + 2 * Math.PI - 0.1]) // This adds a small gap that is filled with year text and rotates to the right
  .align(0)
  .domain(data.map((singleElement: any) => singleElement.id)) // Map returns an array of winner ids

export const yScale = scaleLinear()
  .range([circleScaleLowerRange, circleScaleUpperRange])
  .domain(domain)

export const getCircleTextPosition = (data: any) =>
  Width / 2 + yScale(data) + TextMargin

export const getRotation = (data: any) => {
  const angleToRotate =
    ((xScale(data.id)! + xScale.bandwidth() / 2) * 180) / Math.PI - 90
  return `rotate(${angleToRotate})`
}

export const getTextAnchorPosition = (data: any) =>
  (xScale(data.id)! + xScale.bandwidth() / 2 + Math.PI) % (2 * Math.PI) <
  Math.PI
    ? "end"
    : "start"

export const getWinnerTextPosition = (data: any) =>
  (xScale(data.id)! + xScale.bandwidth() / 2 + Math.PI) % (2 * Math.PI) <
  Math.PI
    ? -yScale(data.year) - performerConstants.Margin
    : yScale(data.year) + performerConstants.Margin

export const getWinnerTextOrientation = (data: any) =>
  (xScale(data.id)! + xScale.bandwidth() / 2 + Math.PI) % (2 * Math.PI) <
  Math.PI
    ? "rotate(180)"
    : "rotate(0)"
