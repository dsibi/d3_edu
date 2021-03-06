import * as d3 from "d3";
import * as topojson from "topojson-client";
import us from "./us.json";
import data from "./wm.json"; 

const width = 975;
const height = 610;

const projection = d3
  .geoAlbersUsa()
  .scale(1300)
  .translate(width / 2, height / 2);

const path = d3.geoPath();
const svg = d3.create("svg").attr("height", height).attr("width", width);

const worldMap = svg
  .append("path")
  .attr("fill", "#ddd")
  .attr("d", path(topojson.feature(us, us.objects.nation)));

const worldBorders = svg
  .append("path")
  .attr("fill", "none")
  .attr("stroke", "#fff")
  .attr("stroke-linejoin", "round")
  .attr("stroke-linecap", "round")
  .attr("d", path(topojson.feature(us, us.objects.states)));

const locations = svg
  .selectAll("g")
  .attr("text-anchor", "middle")
  .attr("font-family", "sans-serif")
  .attr("font-size", 10)
  .data(data)
  .join("g");
console.log(locations);
const locationGroups = locations
  .append("g")
  .attr(
    "transform",
    ({ longitude, latitude }) =>
      `translate(${projection([longitude, latitude]).join(",")})`
  );

// locationGroups.append("circle").attr("r", 10);

// locationGroups
//   .append("text")
//   .attr("font-family", "sans-serif")
//   .attr("font-size", 10)
//   .attr("text-anchor", "middle")
//   .attr("y", -6)
//   .text(({ description }) => description);

document.body.appendChild(svg.node());