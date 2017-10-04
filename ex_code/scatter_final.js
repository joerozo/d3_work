
d3.csv('/Data/bus_perf.csv', function(error, data) {  // NEW

var margin = 50,
            width = 700,
            height = 300,
            x_extent = d3.extent(data, function(d){return d.collision_with_injury}),
            y_extent = d3.extent(data, function(d){return d.dist_between_fail});

var x_scale = d3.scaleLinear()
            .range([margin,width-margin])
            .domain(x_extent)

var y_scale = d3.scaleLinear()
            .range([height-margin, margin])
            .domain(y_extent)

/* svg.axis draws the entire axis (ticks, scale, etc) based of a scaleLinear() */
var x_axis = d3.axisBottom(x_scale)
var y_axis = d3.axisLeft(y_scale)

d3.select("body")
  .append('svg')
    .attr('width', width)
    .attr('height', height)
  .selectAll('circle')
  .data(data)
  .enter()
  .append('circle')
    .attr('cx', function(d){return x_scale(d.collision_with_injury)})
    .attr('cy', function(d){return y_scale(d.dist_between_fail)})
    .attr('r', 5)

d3.select("svg") 
  .append("g") 
    .attr("class", "x axis") 
    .attr("transform", "translate(0," + (height-margin) + ")") 
  .call(x_axis)

d3.select("svg")
  .append("g")
    .attr("class", "y axis") 
    .attr("transform", "translate(50, 0)")
  .call(y_axis)

  // d3.select("svg")
  // .append("text")
  //   .text('collisions with injury (per million miles)')
  //   .attr("class", "x label") 
  //   .attr("transform", "translate(50, 0)")
  // .call(y_axis)

d3.select('.x.axis')
  .append('text')
    .text('collisions with injury (per million miles)')
    .attr('x', 0)
    .attr('y', 200);

}); 




