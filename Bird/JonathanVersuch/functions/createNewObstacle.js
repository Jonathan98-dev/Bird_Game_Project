import { obstacleStyle } from "./obstacleStyle.js";
import { Obstacle } from "../classes/Obstacle.js";

const enemyObstacles = [];

export const getEnemyObstaclesArray = () => {
  return enemyObstacles;
};

export const createNewObstacle = () => {
  if (enemyObstacles.length < 5) {
    let obstacle = document.createElement("div");
    obstacleStyle(obstacle);
    document.body.appendChild(obstacle);
    let movingObstacle = new Obstacle(obstacle, Date.now());
    enemyObstacles.unshift(movingObstacle);
    //console.log(enemyObstacles);
  }
};
