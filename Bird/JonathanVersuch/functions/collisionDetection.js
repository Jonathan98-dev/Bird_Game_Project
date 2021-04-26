export const collisionDetection = (obstacle) => {
  let positionBird = document.getElementById("bird").getBoundingClientRect();

  let positionObstacle = obstacle.getBoundingClientRect();

  if (
    positionBird.left + 50 < positionObstacle.right && //Ist der linke Rand des Vogels +50px näher am linken Browserrand als der rechte Rand des Obstacles? --> Kollision HINTEN
    positionBird.right - 50 > positionObstacle.left && // Ist des rechte Rand des Vogels - 50px weiter vom linken Browserrand entfernt als der linke Rand des Obstacles? --> Kollision VORNE
    positionBird.top + 70 < positionObstacle.bottom && // Ist der obere Rand des Vogels + 70px näher am oberen Browserrand entfernt als der untere Rand des Obstacles? --> Kollision OBEN
    positionBird.bottom - 65 > positionObstacle.top // Ist der untere Rand des Vogels - 65px weiter vom oberen Browserrand entfernt als der obere Rand des Obstacles? --> Kollision UNTEN
  ) {
    return true;
  } else {
    return false;
  }
};
