(function() {
  var margin = {top: 0, left: 0, right: 0, bottom: 0},
      width = 400 - margin.top - margin.bottom,
      height = 800 - margin.left - margin.right;

  var svg = d3.select("#map")
  .append("svg")
      .attr("height", height + margin.top + margin.bottom)
      .attr("width", width + margin.left + margin.right)
    .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  d3.queue()
      .defer(d3.json, "us.json")
      .defer(d3.csv, "csvData.csv")
      .defer(d3.json, "europe.topojson")
      .await(ready)

var projection = d3.geoAlbersUsa()
  .translate([ width / 2, height / 3 ])
  .scale(500)
  


  var path = d3.geoPath()
    .projection(projection)

  

    function ready (error, data, csvData) {
      console.log(data)
      var states = topojson.feature(data, data.objects.states).features
      console.log(states)

      svg.selectAll(".state")
      .data(states)
      .enter().append("path")
      .attr("class", "state")
      .attr("d", path)
      .on('mouseover', function(d){
        d3.select(this).classed("selected", true)
      }) 
      .on('mouseout', function(d){
        d3.select(this).classed("selected", false)
      })

      var counties = topojson.feature(data, data.objects.counties).features
      svg.selectAll(".county")
      .data(counties)
      .enter().append("path")
      .attr("class", "county")
      .attr("d", path)
      
      
      console.log(csvData)
      svg.selectAll(".state-circle")
      .data(csvData)
      .enter().append("circle")
      .attr("class", "csvData")
      .attr("r", 2)
      .attr("cx", function(d){
       var coords = projection([d.state, d.pop])
        console.log(coords)
       return 10;    
      })
      .attr("cy", function(d){
        return 10;
      })

       var europe = topojson.feature(data, data.objects.europe).features
       console.log(europe)
       svg.selectAll(".europe")
      .data(europe)
      .enter().append("path")
      .attr("class", "europe")
      .attr("d", path)
    }
})();
