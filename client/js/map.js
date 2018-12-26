function buildMap(config){
  window.layers = {}

  // base map
  var map = L.map("map", config["options"]).setView(config["initial_view"], config["initial_zoom"]);

  var osmLayer = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // layerControls
  var layerControl = L.control.layers({"OpenStreetMap": osmLayer}, {}, {collapsed: false}).addTo(map);
  map.createLayer = function(id, title){
    var layer = L.geoJSON(null).addTo(map);
    if(title){
      layerControl.addOverlay(layer, title);
    }

    window.layers[id] = layer;
    return layer;
  }

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
    addLocateButton(map, "topleft");
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
