import { gameManager } from "../script.js";

export const gameOver = () => {
  document.getElementById("audio").play();
  alert("Game Over!");
  document.getElementById("bird").style.left = "-1000px";
  location.reload();
};
