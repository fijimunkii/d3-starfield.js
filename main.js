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
        init({frame: 1, start: 0,   rotate: 0, distance: 400, direction: 'top', random: true});
        init({frame: 2, start: 100, rotate: 0, distance: 300, direction: 'top', random: true});
        init({frame: 3, start: 200, rotate: 0, distance: 200, direction: 'top', random: true});
        init({frame: 4, start: 300, rotate: 0, distance: 0, direction: 'top', random: true});
        init({frame: 5, start: 0,   rotate: 0, distance: 200, random: false});
      }
    }
 
    function init(options){

      var space = d3.geo.azimuthal()
          .mode("equidistant")
          .translate([width / 2, height / 2]);

      space.scale(space.scale() * 3);

      var spacePath = d3.geo.path()
          .projection(space)
          .pointRadius(1);

      var projection = d3.geo.azimuthal()
          .mode("orthographic")
          .translate([width / 2, height / 2]);

      var svg = d3.select("body")
          .append("svg")
            .attr("width", width)
            .attr("height", height + 200)
            .attr("style", "position:absolute;top:" + options.start + "px;")
            .attr("class", "svg" + options.frame)
            .attr("data-0", "transform:rotate(0deg);" + "top:0;")
            .attr("data-500", "transform:rotate(" + options.rotate + "deg);" +
                              "top:" + options.distance + "px;");
  
      var starList = createStars({number: 1000, random: options.random});
      
      var stars = svg.append("g")
          .selectAll("g")
          .data(starList)
          .enter()
          .append("path")
            .attr("class", "star")
            .attr("d", function(d){
              spacePath.pointRadius(d.properties.radius);
              return spacePath(d);
            })
            .on('mouseover', function(e) {
              d3.select(this).attr("d", function(d) {
                spacePath.pointRadius(5);
                return spacePath(d);
              })
            })
            .on('mouseout', function(e) {
              d3.select(this).attr('d', function(d) {
                spacePath.pointRadius(1.5);
                return spacePath(d);
              })
            })
            .on('click', function(e) {
              alert('aloha');
            });

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
                radius: 1.2
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
