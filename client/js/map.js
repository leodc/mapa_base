function buildMap(config){
  var map = L.map("map", config["options"]).setView(config["initial_view"], config["initial_zoom"]);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  if(config.locate){
    addLocateButton(map);
  }

  $(window).on("resize", function(){
    map.invalidateSize();
  });

  window.map = map;
}

function addLocateButton(map){
  L.control.locate({
    position: "topright",
    strings: {
      title: "Mostrar mi ubicación",
      metersUnit: "metros",
      feetUnit: "pies",
      popup: "Estás dentro de {distance} {unit} desde este punto",
      outsideMapBoundsMsg: "Error: Fuera de los límites del mapa."
    }
  }).addTo(map);
}
