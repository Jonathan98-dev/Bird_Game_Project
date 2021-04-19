let xBird = 0;
let yBird = 40;
let birdSpeed = 0;
let isPressed = false;
let startTime;
let pressDuration;
let height = window.innerHeight;
let width = window.innerWidth;
export const birdControl = () => {
  switch (event.key) {
    case "ArrowRight":
      (() => {
        if (!isPressed) {
          startTime = Date.now();
          isPressed = true;
        }
        if (xBird < 90) {
          pressDuration = (Date.now() - startTime) / 1000;
          birdSpeed = Math.sqrt(pressDuration * pressDuration) * 3;

          if (birdSpeed < 0.3) {
            xBird += 0.3;
          } else if (birdSpeed > 0.3) {
            xBird += birdSpeed;
          }

          document.getElementById("bird").style.left = xBird + "vw";
        }
      })();
      break;
    case "ArrowLeft":
      (() => {
        if (!isPressed) {
          startTime = Date.now();
          isPressed = true;
        }
        if (xBird > 0) {
          pressDuration = (Date.now() - startTime) / 1000;
          birdSpeed = Math.sqrt(pressDuration * pressDuration) * 3;

          if (birdSpeed < 0.3) {
            xBird -= 0.3;
          } else if (birdSpeed > 0.3) {
            xBird -= birdSpeed;
          }
          document.getElementById("bird").style.left = xBird + "vw";
        }
      })();
      break;

    case "ArrowUp":
      (() => {
        if (!isPressed) {
          startTime = Date.now();
          isPressed = true;
        }
        if (yBird > 0) {
          pressDuration = (Date.now() - startTime) / 1000;
          birdSpeed = Math.sqrt(pressDuration * pressDuration) * 3;
          if (birdSpeed < 0.3) {
            yBird -= 0.3;
          } else if (birdSpeed > 0.3) {
            yBird -= birdSpeed;
          }
          document.getElementById("bird").style.top = yBird + "vh";
        }
      })();
      break;

    case "ArrowDown":
      (() => {
        if (!isPressed) {
          startTime = Date.now();
          isPressed = true;
        }
        if (yBird < 80) {
          pressDuration = (Date.now() - startTime) / 1000;
          birdSpeed = Math.sqrt(pressDuration * pressDuration) * 3;
          if (birdSpeed < 0.3) {
            yBird += 0.3;
          } else if (birdSpeed > 0.3) {
            yBird += birdSpeed;
          }
          document.getElementById("bird").style.top = yBird + "vh";
        }
      })();
      break;
  }
};

function stopBird() {
  isPressed = false;
  birdSpeed = 0;
  console.log("swag");
}

window.addEventListener("keydown", birdControl);
window.addEventListener("keyup", stopBird);
