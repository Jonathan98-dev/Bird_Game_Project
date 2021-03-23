
window.addEventListener("load", start);
window.addEventListener("keydown", moveBird)

let speed = 10000;
let obstacleArray = [];

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
     * max speed is reached at .. seconds
     */
    move() {
        if (speed >= 1000) {
            speed--;
            this.obstacle.style.right = (100 * (Date.now() - this.startTime)) / speed + "vw";
        } else {
            this.obstacle.style.right = (100 * (Date.now() - this.startTime)) / speed + "vw";
        }
    }

    getStartTime() {
        return this.startTime;
    }

    getObstacle() {
        return this.obstacle;
    }
}

/**
 * Starts the game and creates 3 obstacles every 1.6 seconds 
 */
function start() {

    newObstacle();
    setTimeout(newObstacle, 3333);
    setTimeout(newObstacle, 6666);
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
 *  styles the obstacle and gives it a random top position
 *  @param obstacle the obstacle which is being styled
 */
function obstacleStyle(obstacle) {

    obstacle.style.position = "absolute";
    obstacle.style.width = 100 + "px";
    obstacle.style.height = 50 + "vh";
    obstacle.style.backgroundColor = "#5ba48a";
    obstacle.style.top = Math.floor(Math.random() * 50) + "vh";
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

/**
 * Moves the bird, depending on which key is pressed
 * event.key has the value of the pressed key
 */
function moveBird() {

    switch (event.key) {

        case "ArrowLeft":
            document.getElementById('bird').style.left = document.getElementById('bird').offsetLeft - 10 + "px";
            break;

        case "ArrowRight":
            document.getElementById('bird').style.left = document.getElementById('bird').offsetLeft + 10 + "px";
            break;

        case "ArrowUp":
            document.getElementById('bird').style.top = document.getElementById('bird').offsetTop - 10 + "px";
            break;

        case "ArrowDown":
            document.getElementById('bird').style.top = document.getElementById('bird').offsetTop + 10 + "px";
            break;
    }
}
