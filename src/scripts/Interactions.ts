import { select } from "d3-selection"

export const onMouseOver = (data: any) => {
  select("#performersImage")
    .style(
      "background-image",
      `url(https://github.com/smrganic/data-vis/blob/dev/public/images/performers/${data.imageLink}?raw=true)`
    )
    .select("p")
    .text(data.performers)
}
