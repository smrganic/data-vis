import { select, selectAll } from "d3-selection"

export const onMouseOver = (data: any) => {
  const linkBase =
    "https://github.com/smrganic/data-vis/blob/dev/public/images/performers/"
  const dataOrigin = data.originalTarget.__data__
  const imageLink = `${data.originalTarget.__data__.imageLink}?raw=true`

  const selectedId = dataOrigin.id

  select("#performersImage")
    .style("background-image", `url(${linkBase + imageLink})`)
    .select("p")
    .text(`${dataOrigin.performers}, ${dataOrigin.year}`)

  select("#performerInfoGroup").selectAll("text").style("opacity", 0.2)
  select("#performerInfoGroup").selectAll("line").style("opacity", 0.2)
  select("#performerInfoGroup").selectAll("circle").style("opacity", 0.2)

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
