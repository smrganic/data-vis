import { select } from "d3-selection"

window.onload = () => {
  const dataSet = require("../../public/data/eurovisionData.json")

  const images: any = []

  const linkBase =
    "https://github.com/smrganic/data-vis/blob/dev/public/images/performers/"

  dataSet.forEach((element: any) => {
    let image = new Image()
    image.src = `${linkBase + element.imageLink}?raw=true`
    images.push(image)
  })

  const canvas = document.createElement("canvas")
  const ctx = canvas.getContext("2d")
  canvas.width = images[0].width
  canvas.height = images[0].height

  ctx?.drawImage(images[0], 0, 0)

  console.log(canvas.toDataURL())

  select("#performersImage").style("background-image", images[0])
}
