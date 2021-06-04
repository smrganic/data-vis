import * as performerConstants from "./constants/performerInfoGroup/performerGroup"
import * as svgConstants from "./constants/svg"
import * as scales from "./scaleFunctions"
import { imageWidth, imageHeight, titleFontSize } from "./constants/centerData"
import { select } from "d3-selection"

import "../styles/styles.scss"

const data = require("../../public/data/eurovisionData.json")

// Dynamically create an svg element and append it to the container
const svg = svgConstants.Container.append("svg")
  .attr("id", "svgChart")
  .attr("width", svgConstants.Width)
  .attr("height", svgConstants.Height)

// Append a div that holds the performer image and extraInfo paragraph
svgConstants.Container.append("div")
  .attr("id", "performersImage")
  .style("width", `${imageWidth}px`)
  .style("height", `${imageHeight}px`)
  .style("border-radius", "50%")
  .style("background-size", "cover")
  .style("background-position", "center center")
  .style("position", "absolute")
  .style("top", `${svgConstants.Height / 2 - imageHeight / 2}px`)
  .style("left", `${svgConstants.Width / 2 - imageWidth / 2}px`)
  .append("p")
  .attr("id", "extraInfo")

// Add elements that will hold the center text when there is no image
const centerText = svg.append("g").attr("id", "centerText")
centerText
  .append("text")
  .attr("x", svgConstants.Width / 2)
  .attr("y", svgConstants.Height / 2)
  .style("font-size", titleFontSize)
  .style("dominant-baseline", "middle")
  .style("text-anchor", "middle")
  .style("fill", performerConstants.circle.Color)

const chartElements = svg.append("g").attr("id", "chartElements")

// Create a group for the year circles and create them
const circleDates = chartElements.append("g").attr("id", "circleDates")
circleDates
  .selectAll("circle")
  .data(performerConstants.circle.Decades)
  .enter()
  .append("circle")
  .attr("cx", svgConstants.Width / 2)
  .attr("cy", svgConstants.Height / 2)
  .attr("r", (dataElement) => scales.circleScale(dataElement.toString())!)
  .style("fill", "none")
  .style("stroke", performerConstants.circle.Color)
  .style("stroke-width", performerConstants.circle.StrokeWidth)

// Add text to circles
circleDates
  .selectAll("text")
  .data(performerConstants.circle.Decades)
  .join("text")
  .attr(
    "x",
    (dataElement) =>
      svgConstants.Width / 2 +
      scales.circleScale(dataElement.toString())! +
      performerConstants.circle.TextMargin
  )
  .attr("y", () => svgConstants.Height / 2)
  .text((dataElement) => dataElement)
  .style("fill", performerConstants.circle.Color)
  .style("opacity", performerConstants.circle.YearTextOpacity)
  .style("font-size", performerConstants.circle.YearFontSize)
  .style("pointer-events", performerConstants.circle.PointerEvents)

// Group for performer information this applys names and rotation
const performerInfoGroup = chartElements
  .append("g")
  .attr("id", "performerInfoGroup")

performerInfoGroup.attr(
  "transform",
  `translate(${svgConstants.Width / 2}, ${svgConstants.Height / 2})`
)

performerInfoGroup
  .selectAll("g")
  .data(data)
  .enter()
  .append("g")
  .attr("class", "performerInfo")
  .attr("opacity", performerConstants.Opacity)
  .attr("transform", (dataElement: any) => {
    const angleToRotate =
      ((scales.xScale(dataElement.id)! + scales.xScale.bandwidth() / 2) * 180) /
        Math.PI -
      90
    return `rotate(${angleToRotate})`
  })
  .attr("text-anchor", (dataElement: any) => {
    return (scales.xScale(dataElement.id)! +
      scales.xScale.bandwidth() / 2 +
      Math.PI) %
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
      .attr("x", (dataElement: any) => scales.yScale(dataElement.year))
      .attr("y", 0)
      .text((dataElement: any) => `${dataElement.performers}`)
      .style("font-size", "12px")
      .style("dominant-baseline", "middle")

    element
      .append("line")
      .attr("x1", scales.circleScaleLowerRange)
      .attr("x2", scales.yScale(data[data.length - 1].year))
      .attr("y1", 0)
      .attr("y2", 0)
      .style("stroke", performerConstants.lines.Stroke)
      .style("opacity", performerConstants.lines.Opacity)
      .style("stroke-width", performerConstants.lines.StrokeWidth)

    element
      .append("circle")
      .attr("class", "winPoint")
      .attr("cx", (dataElement: any) => scales.yScale(dataElement.year))
      .attr("cy", 0)
      .attr("r", performerConstants.winPoint.Radius)
      .style("fill", performerConstants.winPoint.Fill)
  })
