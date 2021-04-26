import { gameManager } from "../script.js";
import { uploadScore } from "./uploadScore.js";
import { score, userName } from "../script.js";

export const gameOver = () => {
  uploadScore(score, userName);
  score = score;

  // document.getElementById("audio").play();

  document.getElementById("bird").style.left = "-1000px";
  alert(`Game Over! Your score is ${score}`);
};
