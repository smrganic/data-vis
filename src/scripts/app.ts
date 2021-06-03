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

import { imageWidth, imageHeight, titleFontSize } from "./constants/centerData"
// Append a div that holds the performer image and extraInfo paragraph
svgContainer
  .append("div")
  .attr("id", "performersImage")
  .style("width", `${imageWidth}px`)
  .style("height", `${imageHeight}px`)
  .style("border-radius", "50%")
  .style("background-size", "cover")
  .style("background-position", "center center")
  .style(
    "background-image",
    `url(https://github.com/smrganic/data-vis/blob/feature/dataset/public/images/performers/1956_LysAssia-min.jpg?raw=true)`
  )
  .style("position", "absolute")
  .style("top", `${svgHeight / 2 - imageHeight / 2}px`)
  .style("left", `${svgWidth / 2 - imageWidth / 2}px`)
  .append("p")
  .attr("id", "extraInfo")
  .text("testing")

const centerText = svg.append("g").attr("id", "centerText")
centerText
  .append("text")
  .attr("x", svgWidth / 2)
  .attr("y", svgHeight / 2)
  .style("font-size", titleFontSize)
  .style("dominant-baseline", "middle")
  .style("text-anchor", "middle")
  .style("fill", colorMain)
  .text("testing position")
