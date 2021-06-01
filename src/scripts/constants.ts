import { select } from "d3-selection"

const svgContainer = select("#container")
const svgWidth = 1000
const svgHeight = 1000

const decades = [1950, 1960, 1970, 1980, 1990, 2000, 2010, 2020]

export { decades, svgContainer, svgWidth, svgHeight }
