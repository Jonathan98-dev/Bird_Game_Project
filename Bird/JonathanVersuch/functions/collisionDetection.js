export const collisionDetection = (obstacle) => {
  let positionBird = document.getElementById("bird").getBoundingClientRect();

  let positionObstacle = obstacle.getBoundingClientRect();

  if (
    positionBird.left + 16 < positionObstacle.left + positionObstacle.width &&
    positionBird.left + positionBird.width - 37 > positionObstacle.left &&
    positionBird.top < positionObstacle.top + positionObstacle.height &&
    positionBird.height + positionBird.top > positionObstacle.top
  ) {
    return true;
  } else {
    return false;
  }
};
