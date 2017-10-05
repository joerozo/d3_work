
d3.json('/data/turnstiles.json', function(error, data) {

var margin = 40, width = 700 - margin, height = 300 - margin

/******** Animation Functions *********/

function ts_line_mouseOver(){
	ts_line.attr("stroke-width", "5")
}

function ts_line_mouseOut(){
	ts_line.attr("stroke-width", "2.5")
}

function gc_line_mouseOver(){
	gc_line.attr("stroke-width", "5")
}

function gc_line_mouseOut(){
	gc_line.attr("stroke-width", "2.5")
}

/******** Initialization Vars *********/

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
      .attr("fill", "#3423ed")
    .on("mouseover", ts_line_mouseOver)
	.on("mouseout", ts_line_mouseOut)

var gc_var = d3.select("svg")
  .selectAll("circle.grand_central")
    .data(data.grand_central)
    .enter()
    .append("circle")
      .attr("class", "grand_central")
      .attr("fill", "#24c8e5")
    .on("mouseover", gc_line_mouseOver)
	.on("mouseout", gc_line_mouseOut)

var line = d3.line()
	.x(function(d){
		return time_scale(d.time)
	})
	.y(function(d){
		return count_scale(d.count)
	});

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

var ts_line = d3.select("svg")
	.append("path")
	.attr("d", line(data.times_square))
	.attr("fill", "none")
	.attr("stroke", "Black")
	.attr("stroke-width", "2.5")
	.on("mouseover", ts_line_mouseOver)
	.on("mouseout", ts_line_mouseOut);



var gc_line = d3.select("svg")
	.append("path")
	.attr("d", line(data.grand_central))
	.attr("fill", "none")
	.attr("stroke", "Grey")
	.attr("stroke-width", "2.5")
	.on("mouseover", gc_line_mouseOver)
	.on("mouseout", gc_line_mouseOut);

var mean_text = d3.select("svg")
  .append("text")
    .attr("transform", "translate(235, 295)")
    .attr("font-size", "15px")
    .attr("font-family", "impact")
    .text("Mean number of turnstile revolutions")

alter_ts_colors()
alter_gc_colors()

}); 




