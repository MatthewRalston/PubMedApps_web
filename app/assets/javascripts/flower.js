var test;
function rendering() {

  var width = 960,
  height = 500;
  var color = d3.scale.category20();

  
  var svg = d3.select("body").append("svg")
	      .attr("width",width)
	      .attr("height",height);
  
  var force = d3.layout.force()
		       .charge(-120)
		       .gravity(0.1)
		       .linkDistance(function(d){ return d.value;})
		       .size([width,height])
  d3.json("assets/test.json", function(error, graph) {
    test=graph;
    force
      .nodes(graph.nodes)
      .links(graph.links)
      .start();
    
    var link = svg.selectAll(".link")
		  .data(graph.links)
		  .enter().append("line")
		  .attr("class", "link")
		  .style("stroke-width", function(d) { return 5; })
		  .style("stroke",function(d){return "black"});
    
    var node = svg.selectAll(".node")
		  .data(graph.nodes)
		  .enter().append("circle")
		  .attr("class", "node")
		  .attr("r", 10)
		  .style("fill", function(d) { return "red"; })
		  .call(force.drag);
    
    node.append("title")
	.text(function(d) { return "hello"; });
    
    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });
      
      node.attr("cx", function(d) { return d.x; })
          .attr("cy", function(d) { return d.y; });
    });
  });
}

