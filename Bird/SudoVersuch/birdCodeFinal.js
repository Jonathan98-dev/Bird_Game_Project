
window.addEventListener("load", start);
window.addEventListener("keydown", moveBird);
window.addEventListener("keyup", stopBird);

let speed = 10000;
let obstacleArray = [];
let positionBird;
let positionObstacle;
let startTimeGame;
let startTimeBird;
let pressDuration;
let isPressed = false;
let birdSpeed = 0;
let xBird = 0;
let yBird = 375;
let userName;
let score;

//-------------- HIGHSCORE --------------

function setUserName(){
  let user = window.prompt("Enter your name: ");
  if (user === "") {
    user = "User";
  }
  return user;
}

const setHighscore =  async(score, player) => {
  const data = { score: `${score}`, player: `${player}` };

  const response = fetch('http://birdapi.medialabs.at/', {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then((data) => console.log("Success: ", data))
    .catch((error) => {
      console.log("Error:", error);
    });
};

const getHighScore = async () => {
  const response = await fetch("http://birdapi.medialabs.at/");
  if (response.status !== 200) {
    throw new Error("cannot get scores");
  }

  const data = await response.json();
  return data;
};

const displayPlayerScores = () => {
  getHighScore()
    .then((data) => {
      console.log(data);
      data.forEach((playerScore) => {
        scoreBoard.innerHTML += `
        <li class="players">
          <span class="playerName">${playerScore?.player}</span>
          <span class="playerScore"> ${playerScore?.score}</span> 
        </li>`;
      });
    }).catch((err) => console.log("rejected:", err));
};

//-------------- GAME --------------

/**
 * Starts the game and creates 5 obstacles every 2 seconds
 */
function start() {
  userName = setUserName();
  startTimeGame = Date.now();
  newObstacle();
  setTimeout(newObstacle, 2000);
  setTimeout(newObstacle, 4000);
  setTimeout(newObstacle, 6000);
  setTimeout(newObstacle, 8000);
  animateObstacle();
}

/**
 * creates a div and inserts it within the DOM
 * creates an object from the class obstacle
 * @param obstacle the created div which was added into the DOM
 * @param Date.now saves the time at which the obstacle is created
 */
function newObstacle() {
  let obstacle = document.createElement("div");
  obstacleStyle(obstacle);
  document.body.appendChild(obstacle);

  let movingObstacle = new Obstacle(obstacle, Date.now());

  obstacleArray.unshift(movingObstacle);
}

/**
 *Container for the Obstacle
 * @param obstacle the obstacle which is being moved
 * @param startTimeObstacle saved the time at which the obstacle was created
 */
class Obstacle {
  constructor(obstacle, startTimeObstacle) {
    this.obstacle = obstacle;
    this.startTimeObstacle = startTimeObstacle;
  }

  /**
   * changes the position of the obstacle and increased the speed of the movement over time
   * max speed is reached at 1 seconds
   */
  move() {
    if (speed >= 1000) {
      speed--;
    }
    this.obstacle.style.right =
      (100 * (Date.now() - this.startTimeObstacle)) / speed + "vw";
  }

  getStartTime() {
    return this.startTimeObstacle;
  }

  getObstacle() {
    return this.obstacle;
  }
}

/**
 *  styles the obstacle and gives it a random top position
 *  @param obstacle the obstacle which is being styled
 */
function obstacleStyle(obstacle) {
  obstacle.style.position = "absolute";
  obstacle.style.height = 100 + "px";
  obstacle.style.content = 'url("Assets/hawk.gif")';
  obstacle.style.top = Math.floor(Math.random() * 89) + "vh";
  obstacle.style.right = 0;
}

function detectCollision(obstacle) {
  positionBird = document.getElementById("bird").getBoundingClientRect();
  positionObstacle = obstacle.getBoundingClientRect();

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
}

/**
 * goes through the obstacle array and moves the content every single frame
 */
function animateObstacle() {
  
  let currentTime = Date.now();

  for (let obstacleIndex = 0; obstacleIndex < obstacleArray.length; obstacleIndex++) {
    score = Date.now() - startTimeGame;
    if (detectCollision(obstacleArray[obstacleIndex].getObstacle())) {
      gameOver();
      return;
    }

    obstacleArray[obstacleIndex].move();

    if (
      (100 * (currentTime - obstacleArray[obstacleIndex].getStartTime())) /
        speed >=
      100
    ) {
      document.body.removeChild(obstacleArray[obstacleIndex].getObstacle());
      obstacleArray.pop();
      newObstacle();
    }
  }

  requestAnimationFrame(animateObstacle);
}

//-------------- GAME OVER --------------

function removeBirds(){

  document.getElementById("bird").style.display = "none";

  for (let obstacleIndex = 0; obstacleIndex < obstacleArray.length; obstacleIndex++) {
    document.body.removeChild(obstacleArray[obstacleIndex].getObstacle());
  }
}

function gameOver() {
  document.getElementById("audio").play();
  removeBirds();
  setHighscore(score, userName);
  displayPlayerScores();
}


//-------------- CONTROLS --------------

function stopBird() {
  isPressed = false;
  birdSpeed = 0;
}

/**
 * Moves the bird, depending on which key is pressed
 * The longer the key is pressed, the faster the bird moves
 * @param event.key has the value of the pressed key
 */
function moveBird() {
  if (!isPressed) {
    startTimeBird = Date.now() - 2000;
  }

  isPressed = true;

  switch (event.key) {
    case "ArrowRight":
      requestAnimationFrame(animateBirdRight);

      function animateBirdRight() {
        if (!isPressed) {
          return;
        }

        if (xBird < 1824) {
          if (birdSpeed <= 1) {
            pressDuration = (Date.now() - startTimeBird) / 1000;
            birdSpeed = pressDuration * pressDuration;
          }

          xBird += birdSpeed;
          document.getElementById("bird").style.left = xBird + "px";
        }

        requestAnimationFrame(animateBirdRight);
      }

      break;

    case "ArrowLeft":
      requestAnimationFrame(animateBirdLeft);

      function animateBirdLeft() {
        if (!isPressed) {
          return;
        }

        if (xBird > 0) {
          if (birdSpeed <= 1) {
            pressDuration = (Date.now() - startTimeBird) / 1000;
            birdSpeed = pressDuration * pressDuration;
          }

          xBird -= birdSpeed;
          document.getElementById("bird").style.left = xBird + "px";
        }

        requestAnimationFrame(animateBirdLeft);
      }

      break;

    case "ArrowUp":
      requestAnimationFrame(animateBirdUp);

      function animateBirdUp() {
        if (!isPressed) {
          return;
        }

        if (yBird > 0) {
          if (birdSpeed <= 1) {
            pressDuration = (Date.now() - startTimeBird) / 1000;
            birdSpeed = pressDuration * pressDuration;
          }

          yBird -= birdSpeed;
          document.getElementById("bird").style.top = yBird + "px";
        }

        requestAnimationFrame(animateBirdUp);
      }

      break;

    case "ArrowDown":
      requestAnimationFrame(animateBirdDown);

      function animateBirdDown() {
        if (!isPressed) {
          return;
        }

        if (yBird < 796) {
          if (birdSpeed <= 1) {
            pressDuration = (Date.now() - startTimeBird) / 1000;
            birdSpeed = pressDuration * pressDuration;
          }

          yBird += birdSpeed;
          document.getElementById("bird").style.top = yBird + "px";
        }

        requestAnimationFrame(animateBirdDown);
      }

      break;
  }
}