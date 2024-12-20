import { HtmlHTMLAttributes } from "react";

export default class Snake {
  private snake: Array<{ x: number; y: number }>;
  private board: HTMLElement;
  private isGrowing: boolean = false;

  constructor(board: HTMLElement, snake: Array<{ x: number; y: number }>) {
    this.snake = snake;
    this.board = board;
  }

  get head(): { x: number; y: number } {
    return { ...this.snake[0] };
  }

  move(direction: { xVelocity: number; yVelocity: number }): void {
    const head = {
      x: this.snake[0].x + direction.xVelocity,
      y: this.snake[0].y + direction.yVelocity,
    };
    this.snake.unshift(head);
    if (!this.isGrowing) {
      this.snake.pop();
    }

    this.isGrowing = false;
  }

  draw(): void {
    this.snake.forEach(({ x, y }) => {
      const snakeSegment = document.createElement("div");
      snakeSegment.style.gridRowStart = `${y}`;
      snakeSegment.style.gridColumnStart = `${x}`;
      snakeSegment.classList.add("snake");

      this.board.appendChild(snakeSegment);
    });
  }

  eat(): void {
    this.isGrowing = true;
  }

  isHitSelf(): boolean {
    var { x, y } = this.head;
    for (let i = 1; i < this.snake.length; i++)
      if (this.snake[i].x == x && this.snake[i].y == y) return true;

    return false;
  }

  isColliding(x: number, y: number): boolean {
    return this.snake.some((segment) => {
      return segment.x == x && segment.y == y;
    });
  }

  static Create(boardSize: number, board: HTMLElement): Snake {
    const xStartPosition = boardSize / 2;
    const yStartPosition = boardSize / 2;

    return new Snake(board, [
      { x: xStartPosition, y: yStartPosition },
      { x: xStartPosition + 1, y: yStartPosition },
    ]);
  }
}
