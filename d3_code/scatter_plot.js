
d3.json('/Data/turnstiles.json', function(error, data) {

var margin = 40, width = 700 - margin, height = 300 - margin

d3.select("body")
  .append("svg")
    .attr("width", width + margin)
    .attr("height", height + margin)
  .append("g")
    .attr("class", "chart");

var ts_var = d3.select("svg")
  .selectAll("circle.times_square")
    .data(data.times_square)
    .enter()
    .append("circle")
      .attr("class", "times_square")
      .attr("fill", "purple")

var gc_var = d3.select("svg")
  .selectAll("circle.grand_central")
    .data(data.grand_central)
    .enter()
    .append("circle")
      .attr("fill", "#44CAF5")
      .attr("class", "grand_central")

function handleMouseOver(){
  mean_text.style('fill', 'blue').attr("font-size", "25px").attr("transform", "translate(180, 295)")
}


function handleMouseOut(){
  mean_text.style('fill', 'darkOrange').attr("font-size", "15px").attr("transform", "translate(235, 295)")
}

function alter_gc_colors(){
  gc_var.transition().delay(1000).duration(1000)
      .attr("fill", "#f48f42")
      .transition().delay(1000).duration(1000)
      .attr("fill", "#f23615")
  .on("end", alter_gc_colors);
}

function alter_ts_colors(){
  ts_var.transition().delay(1000).duration(10000)
      .attr("fill", "#f48f42")
      .transition().delay(1000).duration(10000)
      .attr("fill", "#3235F5")
  .on("end", alter_ts_colors);
}

/******** Extents for scales *********/
var count_extent = d3.extent(
    data.times_square.concat(data.grand_central),
    function(d){
      return d.count
    }
  );

var time_extent = d3.extent(
    data.times_square.concat(data.grand_central), 
    function(d){
      return d.time
    }
  );

/******** Scales for the viz *********/

var count_scale = d3.scaleLinear()
  .domain(count_extent)
  .range([height, margin]);

var time_scale = d3.scaleTime()
  .domain(time_extent)
  .range([margin, width])


/******** Axis' for the Viz *********/
var time_axis = d3.axisBottom()
  .scale(time_scale)  

var count_axis = d3.axisLeft()
  .scale(count_scale)

/******** Circle Edits *********/
d3.selectAll("circle")
  .attr("cy", function(d){
    return count_scale(d.count);
  })
  .attr("cx", function(d){
    return time_scale(d.time)
  });

d3.selectAll("circle")
  .attr("r", 5);

/******** Circle Axis' *********/
d3.select("svg")
  .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0, 260)")
    .call(time_axis)

d3.select("svg")
  .append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + margin + ",0)")
    .call(count_axis)

/******** Define Axis' *********/
d3.select("svg")
  .append("text")
    .attr("transform", "translate(280, 20)")
    .text("Turnstile Time Analysis")

var mean_text = d3.select("svg")
  .append("text")
    .attr("transform", "translate(235, 295)")
    .attr("font-size", "15px")
    .style('fill', 'darkOrange')
    .attr("font-family", "impact")
    .text("Mean number of turnstile revolutions")
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut);


alter_ts_colors()
alter_gc_colors()

}); 




