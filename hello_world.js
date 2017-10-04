looker.plugins.visualizations.add({
  id: "hello_world",
  label: "Hello World",

  options: {
  	font_size: {
  		type: "string",
  		label: "Font Size",
  		values:[
  			{"Large": "large"},
  			{"Small": "small"}
  		],
  		display: "radio",
  		default: "large"
  	}
  },

  create: function(element, config) {
  	var css = element.innerHTML = `
    <style>
      .hello-world-vis {
        // Vertical centering
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
      }

      .hello-world-text-large {
		  font-size: 72px;
	   }

	   .hello-world-text-small {
		  font-size: 18px;
		}

    </style>
  `;

  var container = element.appendChild(document.createElement("div"));
  container.className = "hello-world-vis";
  this._textElement = container.appendChild(document.createElement("div"));
  },

  update: function(data, element, config, queryResponse) {
  	this.clearErrors();

  	if(queryResponse.fields.dimensions.length == 0){
  		this.addError({
  			title: "No Dimensions", 
  			message: "This chart requires dimensions."
  		});
  		return;
  	}

  	if (config.font_size == "small") {
	  this._textElement.className = "hello-world-text-small";
	} else {
	  this._textElement.className = "hello-world-text-large";
	}

  	var first_row = data[0];
  	var first_cell = first_row[queryResponse.fields.dimensions[0].name];
  	this._textElement.innerHTML = LookerCharts.Utils.htmlForCell(first_cell);
  }

})
