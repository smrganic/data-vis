import * as performerConstants from "../constants/performerInfoGroup/performerGroup"
import * as svgConstants from "../constants/svg"
import * as scales from "./scaleFunctions"
import * as centerDataConstants from "../constants/centerData"

import { select } from "d3-selection"
import "d3-transition"
import { onLinkClick, onMouseOut, onMouseOver } from "./Interactions"
import { easeBackIn, easeBackOut } from "d3-ease"
import { DefaultDuration, ShortDuration } from "../constants/transitions"

const data = require("../../data/eurovisionData.json")

export const renderSvg = () => {
  // Dynamically create an svg element and append it to the container
  const parentDiv = svgConstants.Container.append("div")
    .attr("id", "parentDiv")
    .attr("class", "flex-child")
  const svg = parentDiv
    .append("svg")
    .attr("id", "svgChart")
    .attr("viewBox", "0 0 1000, 1000")

  // Append a div that holds the performer image and extraInfo paragraph
  parentDiv
    .append("div")
    .attr("id", "performersImage")
    .append("p")
    .attr("id", "extraInfo")

  // Add elements that will hold the center text when there is no image
  const centerText = svg.append("g").attr("id", "centerText")
  centerText
    .append("text")
    .attr("class", "centerText")
    .attr("x", svgConstants.Width / 2)
    .attr("y", svgConstants.Height / 2 - 10)
    .text(centerDataConstants.textMain)

  centerText
    .append("text")
    .attr("class", "centerText")
    .attr("x", svgConstants.Width / 2)
    .attr("y", svgConstants.Height / 2 + 20)
    .text(centerDataConstants.textDesription)

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
    .attr("r", 0)
    .transition()
    .duration(DefaultDuration)
    .ease(easeBackOut)
    .delay((_, i) => i * ShortDuration)
    .attr("r", (dataElement) => scales.yScale(dataElement))

  let transitionCounter = 0
  // Add text to circles
  circleDates
    .selectAll("text")
    .data(performerConstants.circle.Decades)
    .join("text")
    .attr("class", "circle-text")
    .attr("x", (dataElement) => scales.getCircleTextPosition(dataElement))
    .attr("y", () => svgConstants.Height / 2)
    .text((dataElement) => dataElement)
    .transition()
    .each(() => transitionCounter++)
    .ease(easeBackIn)
    .duration(DefaultDuration)
    .delay((_, i) => i * ShortDuration)
    .style("opacity", performerConstants.circle.YearTextOpacity)
    .on("end", () => {
      if (!--transitionCounter) renderPerformers()
    })

  const renderPerformers = () => {
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
      .attr("transform", (dataElement) => scales.getRotation(dataElement))
      .attr("text-anchor", (dataElement) =>
        scales.getTextAnchorPosition(dataElement)
      )
      .style("opacity", 0)
      .each(function (dataElement: any) {
        // For each added group allso add a link some text line segment and circle

        const element = select(this)

        element
          .append("a")
          .attr("id", (dataElement: any) => `winner-${dataElement.id}-link`)
          .append("text")
          .attr("id", (dataElement: any) => `winner-${dataElement.id}-text`)
          .attr("class", "winner-text")
          .attr("x", (dataElement) => scales.getWinnerTextPosition(dataElement))
          .attr("y", 0)
          .text((dataElement: any) => `${dataElement.song}`)
          .attr("transform", (dataElement: any) =>
            scales.getWinnerTextOrientation(dataElement)
          )
          .on("mouseover", onMouseOver)
          .on("mouseout", onMouseOut)
          .on("click", onLinkClick)

        element
          .append("line")
          .attr("id", (dataElement: any) => `winner-${dataElement.id}-line`)
          .attr("class", "winner-line")
          .attr("x1", scales.circleScaleLowerRange)
          .attr("x2", scales.yScale(dataElement.year))
          .attr("y1", 0)
          .attr("y2", 0)

        element
          .append("circle")
          .attr("id", (dataElement: any) => `winner-${dataElement.id}-circle`)
          .attr("class", "winPoint-circle")
          .attr("cx", (dataElement: any) => scales.yScale(dataElement.year))
          .attr("cy", 0)
          .attr("r", performerConstants.winPoint.Radius)
      })
      .transition()
      .duration(DefaultDuration)
      .delay((_, i) => i * 25)
      .style("opacity", 1)
  }
}
