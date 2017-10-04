var dataArray = [23, 13, 21, 14, 37, 15, 18, 34, 30];

var president_data;



  d3.csv('/Data/construction.csv', function(error, data) {  // NEW
  data.forEach(function(d) {                    
    president_data = data;                           
  });                                              

  var margin = 50, width = 700, height = 300;
  d3.select("body")
  	.append("svg")
  		.attr("width", width)
  		.attr("height", height)
  		.selectAll("circle")
  		.data(president_data)
  		.enter()
  		.append("circle");

  	d3.selectAll("circle")
  	.attr("cx", function(d){return d.serialid})
  	.attr("cy", function(d){return d.val})
  	d3.selectAll("circle")
  	.attr("r", 5);
  	// var x_extent = d3.extent(president_data, function(d){return d.serialid});
  	// var x_scale = d3.scale.linear()
  	// .range([margin, width-margin])
  	// .domain(x_extent);
  	// var y_extent = d3.extent(president_data, function(d){return d.val});
  	// var y_scale = d3.scale.linear()
  	// .range([height-margin, margin])
  	// .domain(y_extent);


  // 		.attr("class", "chart")
  // 	.selectAll("div.line")
  // 	.data(president_data)
  // 	.enter()
  // 	.append("div")
  // 		.attr("class", "line");

  // d3.selectAll("div.line")
  // 	.append("div")
  // 		.attr("class", "label")
  // 		.text(function(d){
  // 			return d.val
  // 		});

  // d3.selectAll("div.line")
  // 	.append("div")
  // 	.attr("class", "bar")
  // 	.style("width", function(d){
  // 		return d.val/10 + "px"
  // 	})
  // 	.text(function(d){
  // 		return Math.round(d.val)
  // 	});

}); 




