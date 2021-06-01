import { svgContainer, svgWidth, svgHeight } from "./constants/svg"

import {
  decades,
  colorMain,
  textMargin,
  yearFontSize,
  yearTextOpacity,
} from "./constants/circle"

import { circleScale } from "./scaleFunctions"
import "../styles/styles.scss"

// Dynamically create an svg element and append it to the container
const svg = svgContainer
  .append("svg")
  .attr("id", "svgChart")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

// Create a group for the year circles and create them
const circleDates = svg.append("g").attr("id", "circleDates")
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
