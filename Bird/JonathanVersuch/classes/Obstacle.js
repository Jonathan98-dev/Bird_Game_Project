export class Obstacle {
  constructor(obstacle, startTime) {
    this.obstacle = obstacle;
    this.startTime = startTime;
  }

  move(speed) {
    this.obstacle.style.right =
      (100 * (Date.now() - this.startTime)) / speed + "vw";
  }

  getStartTime() {
    return this.startTime;
  }

  getObstacle() {
    return this.obstacle;
  }
}
