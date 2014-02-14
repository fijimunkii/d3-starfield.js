;(function(w, d3, undefined){
    "use strict";
 
    var width, height;
    
    function getSize(){
      width = w.innerWidth,
      height = w.innerHeight;
 
      if(width === 0 || height === 0){
        setTimeout(function(){
          getSize();
        }, 100);
      } else {
        init({frame: 1});
        init({frame: 2});
      }
    }
 
    function init(options){

      //Setup path for outerspace
      var space = d3.geo.azimuthal()
          .mode("equidistant")
          .translate([width / 2, height / 2]);

      space.scale(space.scale() * 3);

      var spacePath = d3.geo.path()
          .projection(space)
          .pointRadius(1);

      //Setup path for globe
      var projection = d3.geo.azimuthal()
          .mode("orthographic")
          .translate([width / 2, height / 2]);

      var scale0 = projection.scale();

      var path = d3.geo.path()
          .projection(projection)
          .pointRadius(2);

      var circle = d3.geo.greatCircle();

      var svg = d3.select("body")
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("class", "svg" + options.frame)
          .append("g");

      //Create a list of random stars and add them to outerspace
      var starList = createStars({number: 2000, random: true});
              
      var stars = svg.append("g")
          .selectAll("g")
          .data(starList)
          .enter()
          .append("path")
            .attr("class", "star")
            .attr("d", function(d){
              spacePath.pointRadius(d.properties.radius);
              return spacePath(d);
            });


      svg.append("rect")
          .attr("class", "frame" + options.frame)
          .attr("width", width)
          .attr("height", height);

      var g = svg.append("g"),
          features;


      function createStars(options){
        var data = [];
          
        for(var i = 0; i < options.number; i++){
          if (options.random) {
            data.push({
              geometry: {
                type: 'Point',
                coordinates: randomLonLat()
              },
              type: 'Feature',
              properties: {
                radius: Math.random()
              }
            });
          } else {
            data.push({
              geometry: {
                type: 'Point',
                coordinates: randomLonLat()
              },
              type: 'Feature',
              properties: {
                radius: 1.5
              }
            });
          }
        }    
        return data;
      }

      function randomLonLat(){
          return [Math.random() * 360 - 180, Math.random() * 180 - 90];
      }
  }

  getSize();

}(window, d3));
