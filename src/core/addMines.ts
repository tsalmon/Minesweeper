import map from './map';
import { MapElement } from './types';

function addMine(map: MapElement[][], width: number, height: number): boolean {
  const indexX: number = Math.floor(Math.random() * width);
  const indexY: number = Math.floor(Math.random() * height);

  if(map[indexX][indexY] === MapElement.Mine) {
    return false;
  }

  map[indexX][indexY] = MapElement.Mine;

  return true;
}

export default function addMines(nbMines: number) {
  if(nbMines <= 0) {
    throw 'No mines to add';
  }

  const currentMap = map.get();
  const width = map.getWidth();
  const height = map.getHeight();
  map.setNbMines(nbMines);

  if(nbMines > width * height) {
    throw 'Too many mines';
  }

  let nbMinesAdded = 0; 

  while(nbMinesAdded < nbMines) {
    if(addMine(currentMap, width, height)) {
      nbMinesAdded++;
    }
  }
}