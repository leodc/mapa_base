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
  if(config.maxBounds){
    var corner1 = L.latLng(config.maxBounds[1], config.maxBounds[0]);
    var corner2 = L.latLng(config.maxBounds[3], config.maxBounds[2]);

    var maxBounds = L.latLngBounds(corner1, corner2);
    map.fitBounds( maxBounds );
    map.setMaxBounds( maxBounds );
  }

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
