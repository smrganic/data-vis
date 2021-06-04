import { svgContainer, svgWidth, svgHeight } from "./constants/svg"

import {
  decades,
  colorMain,
  textMargin,
  yearFontSize,
  yearTextOpacity,
} from "./constants/circle"

import {
  circleScale,
  circleScaleLowerRange,
  xScale,
  yScale,
} from "./scaleFunctions"

import "../styles/styles.scss"

const data = require("../../public/data/eurovisionData.json")

// Dynamically create an svg element and append it to the container
const svg = svgContainer
  .append("svg")
  .attr("id", "svgChart")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

import { imageWidth, imageHeight, titleFontSize } from "./constants/centerData"
import { arc } from "d3-shape"
import { select } from "d3-selection"
// Append a div that holds the performer image and extraInfo paragraph
svgContainer
  .append("div")
  .attr("id", "performersImage")
  .style("width", `${imageWidth}px`)
  .style("height", `${imageHeight}px`)
  .style("border-radius", "50%")
  .style("background-size", "cover")
  .style("background-position", "center center")
  .style("position", "absolute")
  .style("top", `${svgHeight / 2 - imageHeight / 2}px`)
  .style("left", `${svgWidth / 2 - imageWidth / 2}px`)
  .append("p")
  .attr("id", "extraInfo")

// Add elements that will hold the center text when there is no image
const centerText = svg.append("g").attr("id", "centerText")
centerText
  .append("text")
  .attr("x", svgWidth / 2)
  .attr("y", svgHeight / 2)
  .style("font-size", titleFontSize)
  .style("dominant-baseline", "middle")
  .style("text-anchor", "middle")
  .style("fill", colorMain)

const chartElements = svg.append("g").attr("id", "chartElements")

// Create a group for the year circles and create them
const circleDates = chartElements.append("g").attr("id", "circleDates")
circleDates
  .selectAll("circle")
  .data(decades)
  .enter()
  .append("circle")
  .attr("cx", svgWidth / 2)
  .attr("cy", svgHeight / 2)
  .attr("r", (dataElement) => circleScale(dataElement.toString())!)
  .style("fill", "none")
  .style("stroke", colorMain)
  .style("stroke-width", "1")

// Add text to circles
circleDates
  .selectAll("text")
  .data(decades)
  .join("text")
  .attr(
    "x",
    (dataElement) =>
      svgWidth / 2 + circleScale(dataElement.toString())! + textMargin
  )
  .attr("y", () => svgHeight / 2)
  .text((dataElement) => dataElement)
  .style("fill", colorMain)
  .style("opacity", yearTextOpacity)
  .style("font-size", yearFontSize)
  .style("pointer-events", "none")

// Group for performer information this applys names and rotation
const performerInfoGroup = chartElements
  .append("g")
  .attr("id", "performerInfoGroup")

performerInfoGroup.attr(
  "transform",
  `translate(${svgWidth / 2}, ${svgHeight / 2})`
)

import { domain } from "./scaleFunctions"

performerInfoGroup
  .selectAll("g")
  .data(data)
  .enter()
  .append("g")
  .attr("class", "performerInfo")
  .attr("opacity", 0.8)
  .attr("transform", (dataElement: any) => {
    const angleToRotate =
      ((xScale(dataElement.id)! + xScale.bandwidth() / 2) * 180) / Math.PI - 90
    return `rotate(${angleToRotate})`
  })
  .attr("text-anchor", (dataElement: any) => {
    return (xScale(dataElement.id)! + xScale.bandwidth() / 2 + Math.PI) %
      (2 * Math.PI) <
      Math.PI
      ? "end"
      : "start"
  })
  .each(function (dataElement: any) {
    const element = select(this)

    element
      .append("text")
      .attr("text-id", (dataElement: any) => dataElement.id)
      .attr("x", (dataElement: any) =>
        (xScale(dataElement.id)! + xScale.bandwidth() / 2 + Math.PI) %
          (2 * Math.PI) <
        Math.PI
          ? `${-yScale(domain[1])}`
          : `${yScale(domain[1])}`
      )
      .attr("y", 0)

      .text((dataElement: any) => `${dataElement.performers}`)
      .style("font-size", "12px")
      .style("dominant-baseline", "middle")

    element
      .append("line")
      .attr("x1", circleScaleLowerRange)
      .attr("x2", yScale(data[data.length - 1].year))
      .attr("y1", 0)
      .attr("y2", 0)
      .style("stroke", "black")
      .style("opacity", 0.7)
      .style("stroke-width", 0.2)

    element
      .append("circle")
      .attr("class", "winPoint")
      .attr("cx", (dataElement: any) => yScale(dataElement.year))
      .attr("cy", 0)
      .attr("r", 3)
      .style("fill", "black")
  })
