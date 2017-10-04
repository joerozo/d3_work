var svg = d3.select("body").append("svg")
          .attr("height","100%")
          .attr("width","100%");



svg.selectAll("rect")
    .data(dataArray)
    .enter().append("rect")
    	.attr("class", "bar")
		.attr("height", function(d, i) {return (d * 10)})
          .attr("width","40")
          .attr("x", function(d, i) {return (i * 60) + 25})
          //the function underneath standardisez height --> browsers read data from top left to bottom right 
          // the bottom starts all the bars at 400 - then it minuses the size of them. This was they all start
          // at different points accomodated for how large they are
          .attr("y", function(d, i) {return 400 - (d * 10)});

svg.selectAll("text")
	.data(dataArray)
	.enter().append("text")
	.text(function(d){return d})
	.attr("class", "text")
	.attr("x", function(d, i) {return (i * 60) + 36})
    .attr("y", function(d, i) {return 390 - (d * 10)});



d3.csv('/Data/2016_presidential_candidate_expenditures.csv', function(error, dataset) {  // NEW
  dataset.forEach(function(d) {                    // NEW
    d.count = +d.count;                            // NEW
  }); 


d3.select("body")
	.append("ul")
	.selectAll("li")
	.data(president_data)
	.enter()
	.append("li")
		.text(function(d){
			return d.city + ", " + d.amount;
		})
		.attr("class", "text");

d3.selectAll("li")
	.style("font-weight", function(d){
		if(d.amount > 500){
			return "normal";
		}else{
			return "bold";
		}
	});

	d3.select("body")
		.append("ul")
		// .attr("class", "chart")
		.selectAll("bar")
		.data(president_data);
		.enter()
		.append("li")
		.text(function(d){
			return d.city + ", " + d.amount;
		})
		.attr("class", "text");

	d3.select("body")
	.append("div")
		.attr("class", "chart")
	.selectAll(".bar")
	.data(president_data)
	.enter()
	.append("div")
		.attr("class", "bar")
		.attr("x", 10)
		.style("width", function(d){
			return d.amount / 10 + "px"
		})
		.style("outline", "1px solid black")
		.text(function(d){
			return Math.round(d.amount)
		});


svg.selectAll("text")
	.data(president_data)
	.enter().append("text")
	.text(function(d){return d})
	.attr("class", "text")
	.attr("x", function(d, i) {return (i * 60) + 36})

	  d3.select("body")
  	.append("div")
  		.attr("class", "chart")
  	.selectAll("div.line")
  	.data(president_data)
  	.enter()
  	.append("div")
  		.attr("class", "line");

  d3.selectAll("div.line")
  	.append("div")
  		.attr("class", "label")
  		.text(function(d){
  			return d.city
  		});

  d3.selectAll("div.line")
  	.append("div")
  	.attr("class", "bar")
  	.style("width", function(d){
  		return d.amount/10 + "px"
  	})
  	.text(function(d){
  		return Math.round(d.amount)
  	});