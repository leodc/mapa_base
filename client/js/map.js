function buildMap(config){
  var map = L.map("map", config["options"]).setView(config["initial_view"], config["initial_zoom"]);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  if(config.locate){
    L.control.locate({
      position: "topright",
    }).addTo(map);
  }

  $(window).on("resize", function(){
    map.invalidateSize();
  });

  window.map = map;
}
