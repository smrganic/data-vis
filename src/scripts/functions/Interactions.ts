import { select } from "d3-selection"
import * as transitionValues from "../constants/transitions"
import "d3-transition"

export const onMouseOver = (data: any) => {
  const dataOrigin = extractElementFromMouseEvent(data)

  const linkBase =
    "https://github.com/smrganic/data-vis/blob/dev/public/images/performers/"

  const imageLink = `${dataOrigin.imageLink}?raw=true`

  const selectedId = dataOrigin.id

  select("#performersImage")
    .transition()
    .duration(transitionValues.DefaultDuration)
    .style("background-image", `url(${linkBase + imageLink})`)
    .select("p")
    .text(`${dataOrigin.performers}, ${dataOrigin.year}`)

  select("#performerInfoGroup")
    .selectAll("text")
    .style("opacity", transitionValues.OpacityBeforeValue)
  select("#performerInfoGroup")
    .selectAll("line")
    .style("opacity", transitionValues.OpacityBeforeValue)
  select("#performerInfoGroup")
    .selectAll("circle")
    .style("opacity", transitionValues.OpacityBeforeValue)

  select(`#winner-${selectedId}-text`).style(
    "opacity",
    transitionValues.OpacityMax
  )
  select(`#winner-${selectedId}-line`).style(
    "opacity",
    transitionValues.OpacityMax
  )
  select(`#winner-${selectedId}-circle`).style(
    "opacity",
    transitionValues.OpacityMax
  )
}

export const onMouseOut = () => {
  select("#performersImage")
    .transition()
    .duration(transitionValues.ShortDuration)
    .style("background-image", "none")
    .select("p")
    .text("")

  select("#performerInfoGroup")
    .selectAll("text")
    .style("opacity", transitionValues.OpacityMax)
  select("#performerInfoGroup")
    .selectAll("line")
    .style("opacity", transitionValues.OpacityAfterValue)
  select("#performerInfoGroup")
    .selectAll("circle")
    .style("opacity", transitionValues.OpacityMax)
}

const extractElementFromMouseEvent = (data: any) => {
  const dataSet = require("../../data/eurovisionData.json")
  return dataSet.filter((element: any) => {
    const index = parseInt(data.target.id.split("-")[1])
    if (element.id === index) return element
  })[0]
}
