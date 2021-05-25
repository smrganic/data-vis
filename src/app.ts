import { select, selectAll } from "d3-selection"
import { decades } from "./constants"

const svgContainer = select("#container")
const svgWidth = 300
const svgHeight = 300

const svg = svgContainer
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight)

svg.append("rect")
    .attr("x", 100)
    .attr("y", 100)
    .attr("width", 200)
    .attr("height", 200)
    .attr("style", "stroke: blue; stroke-width: 1; fill: lightblue")


const circleDates = svg.append("g").attr("id", "circleDates")

circleDates.selectAll("circle")
    .data(decades)
    .enter()
    .append("circle")
    .attr("cx", svgWidth / 2)
    .attr("cy", svgHeight / 2)
    .attr("r", 100)
    .style("fill", "none")
    .style("stroke", "gray")
    .style("stroke-width", "1")