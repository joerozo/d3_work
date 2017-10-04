  d3.select("body")
  	.append(svg)
  		.attr("width", width)
  		.attr("height", height)
  	.selectAll("circle")
  	.data(sales)
  	.enter()
  	.append("circle");

  	var x_extent = d3.extent(sales, function(d){
  		return d.cost
  	});

  	var x_scale = d3.scale.linear()
  		.range([margin, width-margin])
  		.domain(x_extent);

  	var y_extent = d3.extent(sales, function(d){
  		return d.revenue
  	});

  	var y_scale = d3.scale.linear()
  		.range([height-margin, margin])
  		.domain(y_extent);

  	d3.selectAll("circle")
  		.attr("cx", function(d){
  			x_scale(d.cost)
  		})
  		.attr("cy", function(d){
  			y_scale(d.revenue)
  		});

  	d3.selectAll("circle")
  		.attr("r", 5);
