import { createNewObstacle } from "./createNewObstacle.js";
import { getEnemyObstaclesArray } from "./createNewObstacle.js";
import { collisionDetection } from "./collisionDetection.js";
import { gameOver } from "./gameOver.js";

const obstacleArray = getEnemyObstaclesArray();
let speed = 10000;

export const animateObstacle = () => {
  let currentTime = Date.now();

  for (
    let obstacleIndex = 0;
    obstacleIndex < obstacleArray.length;
    obstacleIndex++
  ) {
    if (collisionDetection(obstacleArray[obstacleIndex].getObstacle())) {
      gameOver();
      return;
    }

    obstacleArray[obstacleIndex].move(speed);

    if (
      (100 * (currentTime - obstacleArray[obstacleIndex].getStartTime())) /
        speed >=
      100
    ) {
      document.body.removeChild(obstacleArray[obstacleIndex].getObstacle());
      obstacleArray.pop();
      createNewObstacle();
    }
    if (speed >= 4000) {
      speed--;
    }
  }
};
