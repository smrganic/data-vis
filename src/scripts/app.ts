import { decades, svgContainer, svgWidth, svgHeight } from "./constants"
import { circleScale } from "./scaleFunctions"
import "../styles/styles.scss"

const svg = svgContainer
  .append("svg")
  .attr("id", "svgChart")
  .attr("width", svgWidth)
  .attr("height", svgHeight)

const circleDates = svg.append("g").attr("id", "circleDates")

//@ts-ignore
circleDates
  .selectAll("circle")
  .data(decades)
  .enter()
  .append("circle")
  .attr("cx", svgWidth / 2)
  .attr("cy", svgHeight / 2)
  .attr("r", (data) => circleScale(data.toString()))
  .style("fill", "none")
  .style("stroke", "gray")
  .style("stroke-width", "1")
