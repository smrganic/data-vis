import {select} from "d3-selection"

select("body").style("color", "red")

if (process.env.NODE_ENV === "development") {
    console.log("this is dev setup")
}
console.log("Bla wow test")