
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

function blue_circle_mouseOver(){
	blue_circle_var.attr("r", "7.5")
}

function blue_circle_mouseOut(){
	blue_circle_var.attr("r", "5")
}

function teal_circle_mouseOver(){
	teal_circle_var.attr("r", "7.5")
}

function teal_circle_mouseOut(){
	teal_circle_var.attr("r", "5")
}

function grey_circle_mouseOver(){
	grey_circle_var.attr("r", "7.5")
}

function grey_circle_mouseOut(){
	grey_circle_var.attr("r", "5")
}

function black_circle_mouseOver(){
	black_circle_var.attr("r", "7.5")
}

function black_circle_mouseOut(){
	black_circle_var.attr("r", "5")
}

function blueCircleClick(){
	var active = bc.active ? false : true,
	   newOpacity = active ? 0 : 1;
	   ts_var.attr("opacity", newOpacity);
	   bc.active = active;
}

function tealCircleClick(){
	var active = gc.active ? false : true,
	   newOpacity = active ? 0 : 1;
	   gc_var.attr("opacity", newOpacity);
	   gc.active = active;
}
/*
 on click var active is either true or false
 if false 
*/
function greyCircleClick(){
	var active = gc.active ? false : true,
       newOpacity = active ? 0 : 1;
       gc_line.attr("opacity", newOpacity);
       gc.active = active;
}

function blackCircleClick(){
	var active = ts.active ? false : true,
       newOpacity = active ? 0 : 1;
       ts_line.attr("opacity", newOpacity);
       ts.active = active;
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
      .attr("id", "bc")
      .attr("class", "times_square")
      .attr("fill", "#3423ed")
    .on("mouseover", ts_line_mouseOver)
	.on("mouseout", ts_line_mouseOut)

var gc_var = d3.select("svg")
  .selectAll("circle.grand_central")
    .data(data.grand_central)
    .enter()
    .append("circle")
      .attr("id", "gc")
      .attr("class", "grand_central")
      .attr("fill", "#24c8e5")
    .on("mouseover", gc_line_mouseOver)
	.on("mouseout", gc_line_mouseOut)

// d3.select("svg")
//     .append("circle")
//       .attr("class", "grand_central")
//       .attr("fill", "#24c8e5")
//       .attr("transform", "translate(" + margin + ",180)")
//     .on("mouseover", gc_line_mouseOver)
// 	.on("mouseout", gc_line_mouseOut)

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

var blue_circle_var = d3.select("svg")
  .append("circle")
      .attr("fill", "#3423ed")
      .attr("r", "5")
   	  .attr("transform", "translate(480, 290)")
  .on("mouseover", blue_circle_mouseOver)
  .on("mouseout", blue_circle_mouseOut)
  .on("click", blueCircleClick)

var teal_circle_var = d3.select("svg")
  .append("circle")
      .attr("fill", "#24c8e5")
      .attr("r", "5")
   	  .attr("transform", "translate(510, 290)")
  .on("click", tealCircleClick)
  .on("mouseover", teal_circle_mouseOver)
  .on("mouseout", teal_circle_mouseOut)

var grey_circle_var = d3.select("svg")
  .append("circle")
      .attr("fill", "Grey")
      .attr("r", "5")
   	  .attr("transform", "translate(540, 290)")
  .on("click", greyCircleClick)
  .on("mouseover", grey_circle_mouseOver)
  .on("mouseout", grey_circle_mouseOut)

var black_circle_var = d3.select("svg")
  .append("circle")
      .attr("fill", "Black")
      .attr("r", "5")
   	  .attr("transform", "translate(570, 290)")
  .on("click", blackCircleClick)
  .on("mouseover", black_circle_mouseOver)
  .on("mouseout", black_circle_mouseOut)

var ts_line = d3.select("svg")
	.append("path")
	.attr("id", "ts")
	.attr("d", line(data.times_square))
	.attr("fill", "none")
	.attr("stroke", "Black")
	.attr("stroke-width", "2.5")
	.on("mouseover", ts_line_mouseOver)
	.on("mouseout", ts_line_mouseOut);

var gc_line = d3.select("svg")
	.append("path")
	.attr("id", "gc")
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




