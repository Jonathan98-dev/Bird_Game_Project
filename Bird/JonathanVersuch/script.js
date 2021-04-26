import { createNewObstacle } from "./functions/createNewObstacle.js";
import { animateObstacle } from "./functions/animateObstacle.js";
import { birdControl } from "./functions/birdControls.js";

let gameIsStarted = false;

export const gameManager = () => {
  if (gameIsStarted === false) {
    createNewObstacle();
    setTimeout(createNewObstacle, 2000);
    setTimeout(createNewObstacle, 4000);
    setTimeout(createNewObstacle, 6000);
    setTimeout(createNewObstacle, 8000);
    gameIsStarted = true;
  }
  animateObstacle();
  requestAnimationFrame(gameManager);
};

gameManager();
