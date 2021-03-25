
window.addEventListener("load", start);
window.addEventListener("keydown", moveBird)

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


var xBird = 0;
var yBird = 40;
/**
 * Moves the bird, depending on which key is pressed
 * event.key has the value of the pressed key
 */
function moveBird() {

    switch (event.key) {

        case "ArrowLeft":
            if(xBird < 5){
                console.log("boundary")
            }else{
            xBird -= 5;
            document.getElementById('bird').style.left = xBird + "vw"
            console.log('X: ' + xBird + ' | ' + 'Y: ' + yBird)
            }
            break;
        

        case "ArrowRight":
            if(xBird == 90){
                console.log("boundary")
            }else{
            xBird += 5;
            document.getElementById('bird').style.left = xBird + "vw"
            console.log('X: ' + xBird + ' | ' + 'Y: ' + yBird)
            }
            break;

        case "ArrowUp":
            if(yBird < 5){
                console.log("boundary")
            }else{
            yBird -= 5;
            document.getElementById('bird').style.top = yBird + "vh"
            console.log('X: ' + xBird + ' | ' + 'Y: ' + yBird)
            }
            break;

        case "ArrowDown":
            if(yBird == 75){
                console.log("boundary")
            }else{
            yBird += 5;
            document.getElementById('bird').style.top = yBird + "vh"
            console.log('X: ' + xBird + ' | ' + 'Y: ' + yBird)
            }
            break;
    }
}
