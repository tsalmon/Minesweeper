import { MapElement } from "./types";

class Map {
  map: MapElement[][] = [];
  width: number = 0;
  height: number = 0;
  nbMines: number = 0;

  constructor() {
    this.map = [];
    this.width = 0;
    this.height = 0;
    this.nbMines = 0;
  }

  get() {
    return this.map;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  set(map: MapElement[][]) {
    if(map.length <= 0 || map[0].length <= 0) {
      throw 'Cannot create map'
    }

    this.map = map;
    this.width = map.length;
    this.height = map[0].length;
  }

  getNbMines() {
    return this.nbMines;
  }

  setNbMines(nbMines: number) {
    this.nbMines = nbMines;
  }

  getProxyMines(indexX: number, indexY: number): number {
    if(indexX < 0 || indexX >= this.map.length || indexY < 0 || indexY >= this.map[indexX].length) {
      throw `Outside map index (${indexX})(${indexY})`
    }

    const c1 = (indexX - 1 >= 0 && indexY - 1 >= 0)
      ? (this.map[indexX - 1][indexY - 1] === MapElement.Mine ? 1 : 0)
      : 0;
    const c2 = (indexX - 1 >= 0) ? (this.map[indexX - 1][indexY] === MapElement.Mine ? 1 : 0) : 0;

    const c3 = (indexX - 1 >= 0 && indexY + 1 < this.map[indexX].length)
      ? (this.map[indexX - 1][indexY + 1] === MapElement.Mine ? 1 : 0)
      : 0;

    const c4 = (indexY - 1 >= 0)
      ? (this.map[indexX][indexY - 1] === MapElement.Mine ? 1 : 0)
      : 0;
    const c5 = (indexY + 1 < this.map[indexX].length)
      ? (this.map[indexX][indexY + 1] === MapElement.Mine ? 1 : 0)
      : 0;

    const c6 = (indexX + 1 < this.map.length && indexY - 1 >= 0)
      ? (this.map[indexX + 1][indexY - 1] === MapElement.Mine ? 1 : 0)
      : 0;
    const c7 = (indexX + 1 < this.map.length) ? (this.map[indexX + 1][indexY] === MapElement.Mine ? 1 : 0) : 0;

    const c8 = (indexX + 1 < this.map.length && indexY + 1 < this.map[indexX + 1].length)
      ? (this.map[indexX + 1][indexY + 1] === MapElement.Mine ? 1 : 0)
      : 0;

    return c1 + c2 + c3 + c4 + c5 + c6 + c7 + c8;
  }
}

const map = new Map();

export default map;