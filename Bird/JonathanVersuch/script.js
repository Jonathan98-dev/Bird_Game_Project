import { createNewObstacle } from "./functions/createNewObstacle.js";
import { animateObstacle } from "./functions/animateObstacle.js";
import { birdControl } from "./functions/birdControls.js";
import { userNaming } from "./functions/userNaming.js";
import { getScores } from "./functions/getScores.js";
import { displayPlayerScores } from "./functions/displayPlayerScores.js";

let gameIsStarted = false;
let startTime;
export let score;
export let userName;
let onlineScores;
let data;

displayPlayerScores();

export const gameManager = () => {
  if (gameIsStarted === false) {
    getScores();
    userName = userNaming();
    startTime = Date.now();
    createNewObstacle();
    setTimeout(createNewObstacle, 2000);
    setTimeout(createNewObstacle, 4000);
    setTimeout(createNewObstacle, 6000);
    setTimeout(createNewObstacle, 8000);
    gameIsStarted = true;
  }

  score = Date.now() - startTime;
  document.getElementById("score").innerHTML = `${userName} Score: ${score}`;
  document.getElementById("yourScore").innerHTML = `Your score: ${score}`;
  animateObstacle();
  requestAnimationFrame(gameManager);
};

gameManager();
