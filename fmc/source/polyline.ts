import { LatLng } from "leaflet";

const polyline = L.polyline([], {
  color: "#7b7c14",
  weight: 2,
  lineJoin: "round",
});

function setAt(n: number, coords: LatLng | LatLng[] | LatLng[][]) {
  const list = polyline.getLatLngs();
  list[n] = coords;
  polyline.setLatLngs(list);
}

function insertAt(n: number, coords) {
  const list = polyline.getLatLngs();
  list.splice(n, 0, coords);
  polyline.setLatLngs(list);
}

function deleteAt(n: number) {
  const list = polyline.getLatLngs();
  list.splice(n, 1);
  polyline.setLatLngs(list);
}

export default {
  path: polyline,
  setAt,
  insertAt,
  deleteAt,
};
