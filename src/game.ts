import {
  BOARD_SIZE,
  FOOD_SPAWM_THRESHOLD,
  FOOD_THRESHOLD,
  SNAKE_SPEED,
  UNIT_SIZE,
} from "./constansts";
import Food from "./food";
import Snake from "./snake";

class Game {
  private board: HTMLElement;

  private score: number = 0;
  private xVelocity: number = 1;
  private yVelocity: number = 0;
  private isMoving: boolean = false;
  private isPaused: boolean = false;

  private lastRenderTick: number = 0;
  private lastFoodTick: number | null = null;

  private snake!: Snake;
  private food: Food | null = null;

  constructor() {
    this.board = document.querySelector(".board") as HTMLElement;
    this.board.style.gridTemplateRows = `repeat(${BOARD_SIZE}, ${UNIT_SIZE}px)`;
    this.board.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, ${UNIT_SIZE}px)`;

    this.renderGrid();
    this.attachEvents();
  }

  start(): void {
    if (this.isMoving) return;

    this.setActionButtonText("End");
    this.food = null;
    this.lastRenderTick = 0;
    this.lastFoodTick = null;
    this.isMoving = true;
    this.isPaused = false;
    this.snake = Snake.Create(BOARD_SIZE, this.board);
    this.score = 0;
    this.xVelocity = -1;
    this.yVelocity = 0;

    this.showScore();
    window.requestAnimationFrame(this.gameLoop.bind(this));
  }

  over(): void {
    this.isMoving = false;
    this.setActionButtonText("Restart");
  }

  private redrawBoard(): void {
    this.board.innerHTML = "";
    this.renderGrid();
  }

  private gameLoop(timestamp: number): void {
    if (this.isMoving) {
      window.requestAnimationFrame(this.gameLoop.bind(this));
    }

    if (this.isPaused) {
      return; //pause the game
    }

    this.redrawBoard();

    if (this.checkCollisions()) {
      return this.over();
    }

    const tick = (timestamp - this.lastRenderTick) / 1000;

    if (tick > SNAKE_SPEED / 4) {
      this.snake.move({ xVelocity: this.xVelocity, yVelocity: this.yVelocity });
      this.lastRenderTick = timestamp;
    }

    this.snake.draw();

    this.handleFood(timestamp);
  }

  private checkCollisions(): boolean {
    return (
      this.snake.isHitSelf() ||
      this.snake.head.x < 1 ||
      this.snake.head.x > BOARD_SIZE ||
      this.snake.head.y < 1 ||
      this.snake.head.y > BOARD_SIZE
    );
  }

  private handleFood(timestamp: number): void {
    const foodTick = (timestamp - (this.lastFoodTick ?? timestamp)) / 1000;

    // spawn new food if FOOD_SPAWM_THRESHOLD ended
    if (!this.food && foodTick > FOOD_SPAWM_THRESHOLD) {
      this.spawnFood();
      this.lastFoodTick = timestamp;
    }

    // if food visible more than FOOD_THRESHOLD remove it
    if (this.food && foodTick >= FOOD_THRESHOLD) {
      this.food = null;
      this.lastFoodTick = timestamp;
    }

    if (
      this.food &&
      this.snake.head.x == this.food.position.x &&
      this.snake.head.y == this.food.position.y
    ) {
      this.snake.eat();
      this.updateScore(1);
      this.showScore();
      this.food = null;
      this.lastFoodTick = timestamp;
    }

    this.food?.draw();

    this.lastFoodTick = this.lastFoodTick ?? timestamp;
  }

  private spawnFood(): void {
    let foodPosition: number[];
    do {
      foodPosition = [
        ~~(Math.random() * BOARD_SIZE) + 1,
        ~~(Math.random() * BOARD_SIZE) + 1,
      ];
    } while (this.snake.isColliding(foodPosition[0], foodPosition[1]));

    this.food = new Food(foodPosition[0], foodPosition[1], this.board);
  }

  private setActionButtonText(content: string): void {
    const el = document.querySelector(".btn") as HTMLElement;
    el.textContent = content;
  }

  private updateScore(value: number): void {
    this.score += value;
  }

  private showScore(): void {
    const scoreContainer = document.querySelector(".score") as HTMLElement;
    scoreContainer.innerHTML = `${this.score}`;
  }

  private renderGrid(): void {
    const grid = document.createElement("div");
    grid.classList.add("grid");
    grid.style.gridTemplateRows = `repeat(${BOARD_SIZE}, ${UNIT_SIZE}px)`;
    grid.style.gridTemplateColumns = `repeat(${BOARD_SIZE}, ${UNIT_SIZE}px)`;

    for (let i = 0; i < BOARD_SIZE * BOARD_SIZE; i++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      grid.appendChild(cell);
    }

    this.board.appendChild(grid);
  }

  private attachEvents(): void {
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      const keyPressed = event.code;

      const movingUp = this.yVelocity == -1;
      const movingDown = this.yVelocity == 1;
      const movingLeft = this.xVelocity == -1;
      const movingRight = this.xVelocity == 1;

      switch (true) {
        case keyPressed == "ArrowUp" && !movingDown:
          this.yVelocity = -1;
          this.xVelocity = 0;
          break;
        case keyPressed == "ArrowDown" && !movingUp:
          this.yVelocity = 1;
          this.xVelocity = 0;
          break;
        case keyPressed == "ArrowLeft" && !movingRight:
          this.xVelocity = -1;
          this.yVelocity = 0;
          break;
        case keyPressed == "ArrowRight" && !movingLeft:
          this.xVelocity = 1;
          this.yVelocity = 0;
          break;
        case keyPressed == "Enter":
          this.start();
          event.preventDefault();
          break;

        case keyPressed == "Space":
          this.isPaused = !this.isPaused;
          event.preventDefault();
          break;
      }
    });

    document.addEventListener("click", (e: MouseEvent) => {
      const el = e.target as HTMLElement;
      if (el.classList.contains("btn")) {
        const action = (this.isMoving ? this.over : this.start).bind(this);
        action();
      }
    });
  }
}

export default Game;
