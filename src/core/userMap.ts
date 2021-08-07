import { MapElement } from "./types";
import map from './map';

class UserMap {
  usermap: MapElement[][] = [];
  width: number = 0;
  height: number = 0;
  nbMines: number = 0;

  constructor() {
    this.usermap = [];
    this.width = 0;
    this.height = 0;
    this.nbMines = 0;
  }

  getWin() {
    return this.nbMines === map.getNbMines();
  }

  get() {
    return this.usermap;
  }

  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  set(usermap: MapElement[][]) {
    if(usermap.length <= 0 || usermap[0].length <= 0) {
      throw 'Cannot create map'
    }

    this.usermap = usermap;
    this.width = usermap.length;
    this.height = usermap[0].length;
  }

  caseIsHidden(choiceX: number, choiceY: number) {
    return this.usermap[choiceX][choiceY] === MapElement.Hide
  }

  explore(choiceX: number, choiceY: number) {
    const m = map.get();

    if(m[choiceX][choiceY] === MapElement.Mine) {
      return false;
    }

    const proxyMines = map.getProxyMines(choiceX, choiceY);

    this.usermap[choiceX][choiceY] = MapElement.Empty;
  
    if(proxyMines > 0) {
      return true;
    }    

    if(choiceX - 1 >= 0 && choiceY - 1 >= 0 && this.caseIsHidden(choiceX - 1, choiceY - 1)) {
      this.explore(choiceX - 1, choiceY - 1);
    }

    if(choiceX - 1 >= 0 && this.caseIsHidden(choiceX - 1, choiceY)) {
      this.explore(choiceX - 1, choiceY);
    }

    if(choiceX - 1 >= 0 && choiceY + 1 < this.height && this.caseIsHidden(choiceX - 1, choiceY + 1)) {
      this.explore(choiceX - 1, choiceY + 1);
    }

    if(choiceY - 1 >= 0 && this.caseIsHidden(choiceX, choiceY - 1)) {
      this.explore(choiceX, choiceY - 1);
    }

    if(choiceY + 1 < this.height && this.caseIsHidden(choiceX, choiceY + 1)) {
      this.explore(choiceX, choiceY + 1);
    }

    if(choiceX + 1 < this.width && choiceY - 1 >= 0 && this.caseIsHidden(choiceX + 1, choiceY - 1)) {
      this.explore(choiceX + 1, choiceY - 1);
    }

    if(choiceX + 1 < this.width && this.caseIsHidden(choiceX + 1, choiceY)) {
      this.explore(choiceX + 1, choiceY);
    }

    if(choiceX + 1 < this.width && choiceY + 1 < this.height && this.caseIsHidden(choiceX + 1, choiceY + 1)) {
      this.explore(choiceX + 1, choiceY + 1);
    }
  }

  pointMine(choiceX: number, choiceY: number) {
    const m = map.get();

    if(m[choiceX][choiceY] === MapElement.Mine) {
      this.nbMines++;
    }

    this.usermap[choiceX][choiceY] = MapElement.Mine;

  }

  play(choiceX: number, choiceY: number): boolean {
    const m = map.get();

    if(m[choiceX][choiceY] === MapElement.Mine) {
      this.usermap[choiceX][choiceY] = MapElement.MineKill;
      return false;
    }

    const proxyMines = map.getProxyMines(choiceX, choiceY);

    this.usermap[choiceX][choiceY] = MapElement.Empty;
  
    if(proxyMines > 0) {
      return true;
    }

    this.explore(choiceX, choiceY);
    return true;
  }
}

const userMap = new UserMap()

export default userMap;