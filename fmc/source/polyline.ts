import { LatLng } from "leaflet";

const path = L.polyline([], {
  color: "#7b7c14",
  weight: 2,
  lineJoin: "round",
});

function setAt(n: number, coords: LatLng | LatLng[] | LatLng[][]) {
  const list = path.getLatLngs();
  list[n] = coords;
  path.setLatLngs(list);
}

function insertAt(n: number, coords) {
  const list = path.getLatLngs();
  list.splice(n, 0, coords);
  path.setLatLngs(list);
}

function deleteAt(n: number) {
  const list = path.getLatLngs();
  list.splice(n, 1);
  path.setLatLngs(list);
}

export const polyline = {
  path,
  setAt,
  insertAt,
  deleteAt,
};
