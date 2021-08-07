import prompts from 'prompts';
import map from './core/map';
import userMap from './core/userMap';
import displayMap from './core/displayMap';
import createMap from './core/createMap';
import addMines from './core/addMines';
import initUserMap from "./core/initUserMap";

async function userChoice() {
  const { value: choiceX } = await prompts({
    type: 'number',
    name: 'value',
    message: 'X ?',
    validate: value => value < 0 || value + 1 > map.getWidth()? `Bad value` : true
  });

  if(choiceX === undefined) {
    return;
  }

  const { value: choiceY } = await prompts({
    type: 'number',
    name: 'value',
    message: 'Y ?',
    validate: value => value < 0 || value + 1 > map.getHeight()? `Bad value` : true
  });

  if(choiceY === undefined) {
    return;
  }

  return { choiceX, choiceY };
}

async function InitGame() {
  const { width } = await prompts({
    type: 'number',
    name: 'width',
    message: 'Longueur',
    validate: value => value < 1 || value > 50 ? `Bad value` : true
  });
  const { height } = await prompts({
    type: 'number',
    name: 'height',
    message: 'Largeur',
    validate: value => value < 1 || value > 50 ? `Bad value` : true
  });

  createMap(parseInt(width, 10), parseInt(height, 10));
  initUserMap();

  const { nbMines } = await prompts({
    type: 'number',
    name: 'nbMines',
    message: 'Nombre de mines',
    validate: value => value < 1 || value > width * height ? `Bad value` : true
  });

  addMines(parseInt(nbMines, 10));
}

async function main() {
  await InitGame();

  while(!userMap.getWin()) {
    console.log(displayMap());
    const choice = await userChoice();

    if(!choice) {
      console.log('Poser une mine')
      const choiceMine = await userChoice();

      if(!choiceMine) {
        return;
      }

      const { choiceX, choiceY } = choiceMine;

      userMap.pointMine(choiceX, choiceY);
    } else {
      const { choiceX, choiceY } = choice;

      if(!userMap.play(choiceX, choiceY)) {
        console.log(displayMap());
        return ;
      }  
    }
  }

  if(userMap.getWin()) {
    console.log(displayMap());
    console.log('GAGNE !');
  }
}


const args = process.argv.slice(2)

if(args.length !== 3) {
  throw 'Bad arguments'
}

main();
