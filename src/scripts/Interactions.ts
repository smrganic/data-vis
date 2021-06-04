import { select, selectAll } from "d3-selection"

export const onMouseOver = (data: any) => {
  const dataOrigin = extractElementFromMouseEvent(data)

  const linkBase =
    "https://github.com/smrganic/data-vis/blob/dev/public/images/performers/"

  const imageLink = `${dataOrigin.imageLink}?raw=true`

  const selectedId = dataOrigin.id

  select("#performersImage")
    .style("background-image", `url(${linkBase + imageLink})`)
    .select("p")
    .text(`${dataOrigin.performers}, ${dataOrigin.year}`)

  select("#performerInfoGroup").selectAll("text").style("opacity", 0.5)
  select("#performerInfoGroup").selectAll("line").style("opacity", 0.5)
  select("#performerInfoGroup").selectAll("circle").style("opacity", 0.5)

  select(`#winner-${selectedId}-text`).style("opacity", 1)
  select(`#winner-${selectedId}-line`).style("opacity", 1)
  select(`#winner-${selectedId}-circle`).style("opacity", 1)
}

export const onMouseOut = (data: any) => {
  select("#performersImage")
    .style("background-image", "none")
    .select("p")
    .text("")

  select("#performerInfoGroup").selectAll("text").style("opacity", 1)
  select("#performerInfoGroup").selectAll("line").style("opacity", 1)
  select("#performerInfoGroup").selectAll("circle").style("opacity", 1)
}

const extractElementFromMouseEvent = (data: any) => {
  const dataSet = require("../../public/data/eurovisionData.json")
  return dataSet.filter((element: any) => {
    const index = parseInt(data.target.id.split("-")[1])
    if (element.id === index) return element
  })[0]
}
