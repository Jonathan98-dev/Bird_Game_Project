import { getScores } from "./getScores.js";

let scoreBoard = document.getElementById("onlineScores");

export const displayPlayerScores = () => {
  getScores()
    .then((data) => {
      console.log(data);
      data.forEach((playerScore) => {
        scoreBoard.innerHTML += `
        <li class="players">
          <span class="playerName">${playerScore?.player}</span>
          <span class="playerScore"> ${playerScore?.score}</span> 
        </li>`;
      });
    })
    .catch((err) => console.log("rejected:", err));
};
