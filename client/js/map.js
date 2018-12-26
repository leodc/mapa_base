function buildMap(config){
  // base map
  var map = L.map("map", config["options"]).setView(config["initial_view"], config["initial_zoom"]);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  $(window).on("resize", function(){
    map.invalidateSize();
  });

  window.map = map;

  // options
  if(config.locate){
    addLocateButton(map, "topright");
  }

  if(config.onClick){
    map.on("click", config.onClick);
  }
}

function addLocateButton(map, position){
  L.control.locate({
    position: position,
    strings: {
      title: "Mostrar mi ubicación",
      metersUnit: "metros",
      feetUnit: "pies",
      popup: "Estás en un radio de {distance} {unit} desde este punto",
      outsideMapBoundsMsg: "Parece que estas fuera de los límites del mapa."
    }
  }).addTo(map);
}
