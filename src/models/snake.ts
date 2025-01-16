import { Segment } from "./segment";

export class Snake {
  private snake: Segment[];
  private isGrowing: boolean = false;

  constructor(segments: Segment[]) {
    this.snake = segments;
  }

  get head(): { x: number; y: number } {
    return { ...this.segments[0] };
  }

  get segments(): Segment[] {
    return [...this.snake];
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

  eat(): void {
    this.isGrowing = true;
  }

  isHitSelf(): boolean {
    const { x, y } = this.head;
    for (let i = 1; i < this.snake.length; i++)
      if (this.snake[i].x == x && this.snake[i].y == y) return true;

    return false;
  }

  isColliding(x: number, y: number): boolean {
    return this.snake.some((segment) => {
      return segment.x == x && segment.y == y;
    });
  }

  static Create(boardSize: number): Snake {
    const xStartPosition = boardSize / 2;
    const yStartPosition = boardSize / 2;

    return new Snake([
      { x: xStartPosition, y: yStartPosition },
      { x: xStartPosition + 1, y: yStartPosition },
    ]);
  }
}
