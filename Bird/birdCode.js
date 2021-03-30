
window.addEventListener("load", start);
window.addEventListener("keydown", moveBird);
window.addEventListener("keyup", stopBird);

let speed = 10000;
let obstacleArray = [];

/**
 * Starts the game and creates 5 obstacles every 2 seconds 
 */
function start() {

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
 * @param startTime saved the time at which the obstacle was created
 */
class Obstacle {

    constructor(obstacle, startTime) {
        this.obstacle = obstacle;
        this.startTime = startTime;
    }

    /**
     * changes the position of the obstacle and increased the speed of the movement over time
     * max speed is reached at 1 seconds
     */
    move() {

        if (speed >= 1000) {
            speed--;
        } 
            this.obstacle.style.right = (100 * (Date.now() - this.startTime)) / speed + "vw";
    }

    getStartTime() {
        return this.startTime;
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

/**
 * goes through the obstacle array and moves the content every single frame 
 */
function animateObstacle() {

    let currentTime = Date.now();

    for (let obstacleIndex = 0; obstacleIndex < obstacleArray.length; obstacleIndex++) {

        obstacleArray[obstacleIndex].move();

        if ((100 * (currentTime - obstacleArray[obstacleIndex].getStartTime())) / speed >= 100) {

            document.body.removeChild(obstacleArray[obstacleIndex].getObstacle());
            obstacleArray.pop();
            newObstacle();
        }
    }

    requestAnimationFrame(animateObstacle);

}

let startTime
let deltaTime;
let isPressed = false;
let birdSpeed;
let xBird = 0;
let yBird = 40;

function stopBird() {
    isPressed = false;
}
function setTime() {
    startTime = Date.now();
    birdSpeed = 50000;
}

/**
 * Moves the bird, depending on which key is pressed
 * event.key has the value of the pressed key
 */
function moveBird() {
    if (!isPressed) {
        setTime();
    }
    isPressed = true

    switch (event.key) {
        case "ArrowRight":
            function animateBirdRight() {

                deltaTime = (100 * (Date.now() - startTime)) / birdSpeed;

                if (xBird < 90) {

                    xBird += deltaTime;
                    birdSpeed -= 0.5;
                    document.getElementById('bird').style.left = xBird + "vw";
                }

                if (!isPressed) {
                    return;
                }

                requestAnimationFrame(animateBirdRight);
            }
            requestAnimationFrame(animateBirdRight);
            break;

        case "ArrowLeft":
            function animateBirdLeft() {

                deltaTime = (100 * (Date.now() - startTime)) / birdSpeed;

                if (xBird > 0) {

                    xBird -= deltaTime;
                    birdSpeed -= 0.5;
                    document.getElementById('bird').style.left = xBird + "vw";
                }

                if (!isPressed) {
                    return;
                }

                requestAnimationFrame(animateBirdLeft);
            }
            requestAnimationFrame(animateBirdLeft);
            break;

        case "ArrowUp":
            function animateBirdUp() {

                deltaTime = (100 * (Date.now() - startTime)) / birdSpeed;

                if (yBird > 0) {

                    yBird -= deltaTime;
                    birdSpeed -= 0.5;
                    document.getElementById('bird').style.top = yBird + "vh";
                }

                if (!isPressed) {
                    return;
                }

                requestAnimationFrame(animateBirdUp);
            }
            requestAnimationFrame(animateBirdUp);
            break;

        case "ArrowDown":
            function animateBirdDown() {

                deltaTime = (100 * (Date.now() - startTime)) / birdSpeed;

                if (yBird < 82) {

                    yBird += deltaTime;
                    birdSpeed -= 0.5;
                    document.getElementById('bird').style.top = yBird + "vh";
                }

                if (!isPressed) {
                    return;
                }

                requestAnimationFrame(animateBirdDown);
            }
            requestAnimationFrame(animateBirdDown);
            break;
    }
}
