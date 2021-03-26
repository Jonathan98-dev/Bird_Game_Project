addEventListener("keydown", moveBird)
addEventListener("keyup", stopBird)

var startTime
var endTime;
var deltaTime;
var isPressed = false;
var xBird = 0;
var yBird = 40;
var currentSpeed;



function stopBird(){
    isPressed = false;
}
function setTime(){
    startTime = Date.now();
    currentSpeed = 0.5;
}

/**
 * Moves the bird, depending on which key is pressed
 * event.key has the value of the pressed key
 */
function moveBird() {
    if(!isPressed){
        setTime()
    }
    isPressed = true

    switch (event.key) {
        case "ArrowRight":
            function animateBirdRight(){
                currentTime = Date.now()
                deltaTime = (currentTime - startTime) + 0.05;
                //console.log("Delta: " + deltaTime)
                if(xBird > 90){
                    //console.log("boundary")
                }else{
                    // f(x) = a * x^2 --> https://studyflix.de/mathematik/quadratische-funktionen-1913
                    (currentSpeed <= 0.15) ? currentSpeed = (0.1 * (((0.5) ^ deltaTime)) / 1000) : currentSpeed = 0
                    xBird += currentSpeed;
                    //console.log(100 * (Date.now() - startTime)/ 1000)
                    document.getElementById('bird').style.left = xBird + "vw"
                    //console.log('X: ' + xBird + ' | ' + 'Y: ' + yBird)
                }
                if(!isPressed){
                    return
                }     
                requestAnimationFrame(animateBirdRight)
            }
            animateBirdRight()
        break;

        case "ArrowLeft":
            function animateBirdLeft(){
                currentTime = Date.now()
                deltaTime = (currentTime - startTime) + 0.05;
                //console.log("Delta: " + deltaTime)
                if(xBird < 1){
                    //console.log("boundary")
                }else{
                    // f(x) = a * x^2 --> https://studyflix.de/mathematik/quadratische-funktionen-1913
                    (currentSpeed <= 0.15) ? currentSpeed = (0.1 * (((0.5) ^ deltaTime)) / 1000) : currentSpeed = 0
                    xBird -= currentSpeed;
                    //console.log(100 * (Date.now() - startTime)/ 1000)
                    document.getElementById('bird').style.left = xBird + "vw"
                    //console.log('X: ' + xBird + ' | ' + 'Y: ' + yBird)
                }
                if(!isPressed){
                    return
                }     
                requestAnimationFrame(animateBirdLeft)
            }
            animateBirdLeft()
        break;

        case "ArrowUp":
            function animateBirdUp(){
                currentTime = Date.now()
                deltaTime = (currentTime - startTime) + 0.05;
                //console.log("Delta: " + deltaTime)
                if(yBird < 1){
                    //console.log("boundary")
                }else{
                    // f(x) = a * x^2 --> https://studyflix.de/mathematik/quadratische-funktionen-1913
                    (currentSpeed <= 0.15) ? currentSpeed = (0.1 * (((0.5) ^ deltaTime)) / 1000) : currentSpeed = 0
                    yBird -= currentSpeed;
                    //console.log(100 * (Date.now() - startTime)/ 1000)
                    document.getElementById('bird').style.top = yBird + "vh"
                    //console.log('X: ' + xBird + ' | ' + 'Y: ' + yBird)
                }
                if(!isPressed){
                    return
                }     
                requestAnimationFrame(animateBirdUp)
            }
            animateBirdUp()
        break;

        case "ArrowDown":
            function animateBirdDown(){
                currentTime = Date.now()
                deltaTime = (currentTime - startTime) + 0.05;
                //console.log("Delta: " + deltaTime)
                if(yBird > 75){
                    //console.log("boundary")
                }else{
                    // f(x) = a * x^2 --> https://studyflix.de/mathematik/quadratische-funktionen-1913
                    (currentSpeed <= 0.15) ? currentSpeed = (0.1 * (((0.5) ^ deltaTime)) / 1000) : currentSpeed = 0
                    yBird += currentSpeed;
                    //console.log(100 * (Date.now() - startTime)/ 1000)
                    document.getElementById('bird').style.top = yBird + "vh"
                    //console.log('X: ' + xBird + ' | ' + 'Y: ' + yBird)
                }
                if(!isPressed){
                    return
                }     
                requestAnimationFrame(animateBirdDown)
            }
            animateBirdDown()
        break;


    }
}
