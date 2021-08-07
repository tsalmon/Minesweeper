import chalk from "chalk";
import { MapElement } from "./types";
import userMap from './userMap';
import map from './map';

function displayColorNumber(proxyMines: number): string {
  switch(proxyMines) {
    case 0: return chalk.white(' ');
    case 1: return chalk.blue(proxyMines);
    case 2: return chalk.green(proxyMines);
    case 3: return chalk.red(proxyMines);
    case 4: return chalk.rgb(128,0,128)(proxyMines);
    case 5: return chalk.rgb(192, 0, 26)(proxyMines);
    case 6: return chalk.rgb(255,192,203)(proxyMines);
    case 7: return chalk.yellow(proxyMines);
    case 8: return chalk.cyan(proxyMines);
  }

  return ' ';
}

function displayMapLineElement(element: MapElement, indexX: number, indexY: number) {
  if (element === MapElement.Mine) {
    return 'X'
  }

  if (element === MapElement.Hide) {
    return '.'
  }

  if(element === MapElement.MineKill) {
    return chalk.white.bgRed.bold('X');
  }

  return displayColorNumber(map.getProxyMines(indexX, indexY));
}

function displayMapLine(line: MapElement[], indexX: number): string {
  return line.reduce((acc, element, indexY) => acc + displayMapLineElement(element, indexX, indexY) + '', '');
}

export default function displayMap(): string {
  let s = '    ';

  for(let i = 0; i < userMap.getWidth(); i++) {
    s += (i % 10).toString();
  }

  return s + '\n' + userMap.get().reduce((acc, line, indexX) => acc + (indexX % 10) + ' | ' + displayMapLine(line, indexX) + '\n', '');
}
