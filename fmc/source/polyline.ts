var polyline = L.polyline([], {
  geodesic: true,
  color: "#7b7c14",
  weight: 2,
  lineJoin: "round",
});

function setAt(n, coords) {
  var list = polyline.getLatLngs();
  list[n] = coords;
  polyline.setLatLngs(list);
}

function insertAt(n, coords) {
  var list = polyline.getLatLngs();
  list.splice(n, 0, coords);
  polyline.setLatLngs(list);
}

function deleteAt(n) {
  var list = polyline.getLatLngs();
  list.splice(n, 1);
  polyline.setLatLngs(list);
}

export default {
  path: polyline,
  setAt: setAt,
  insertAt: insertAt,
  deleteAt: deleteAt,
};
