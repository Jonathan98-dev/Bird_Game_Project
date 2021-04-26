export const obstacleStyle = (obstacle) => {
  obstacle.style.position = "absolute";
  obstacle.style.height = 100 + "px";
  obstacle.style.content = 'url("Assets/hawk.gif")';
  obstacle.style.top = Math.floor(Math.random() * 89) + "vh";
  obstacle.style.right = 0;
  // obstacle.style.border = 5 + "px solid black";
};
