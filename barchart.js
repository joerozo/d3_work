
d3.csv('/Data/turnstiles.csv', function(error, data) {  // NEW

var margin = 40, width = 700 - margin, height = 300 - margin

d3.select("body")
  .append("svg")
    .attr("width", width + margin)
    .attr("height", height + margin)
  .append("g")
    .attr("class", "chart")

}); 




