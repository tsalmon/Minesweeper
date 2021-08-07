import { MapElement } from "./types";
import userMap from './userMap';
import map from './map';

export default function initUserMap() {
  userMap.set(
    map.get().map(
      (line: MapElement[]) => line.map(
        (element: MapElement) => MapElement.Hide
      )
    )
  );
}