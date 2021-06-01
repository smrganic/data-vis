import { select, selectAll } from "d3-selection"
import { scaleBand } from "d3-scale"
import { decades } from "./constants"
import "../styles/styles.scss"
import { range } from "d3-array"

const svgContainer = select("#container")
const svgWidth = 1000
const svgHeight = 1000

const svg = svgContainer
  .append("svg")
  .attr("id", "svgChart")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("viewbox", "0 0 2000 2000")

const circleDates = svg.append("g").attr("id", "circleDates")

let circleScale = scaleBand()
  .domain(decades.map(String))
  .range([0, svgWidth / 2])

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
