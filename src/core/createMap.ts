import map from './map';
import { MapElement } from "./types";

export default function createMap(width: number, heigth: number) {
  const newMap: MapElement[][] = [];
  for(let i = 0; i < width; i++) {
    newMap.push([]);
    for(let j = 0; j < heigth; j++) {
      newMap[i].push(MapElement.Empty);
    }
  }

  map.set(newMap);
}