import { select } from "d3-selection"

export const onMouseOver = (data: any) => {
  const linkBase =
    "https://github.com/smrganic/data-vis/blob/dev/public/images/performers/"
  const imageLink = `${data.originalTarget.__data__.imageLink}?raw=true`
  console.log(linkBase + imageLink)
  select("#performersImage")
    .style("background-image", `url(${linkBase + imageLink})`)
    .select("p")
    .text(data.performers)
}

export const mouseTest = () => {
  console.log("testing")
}
