import { Coordinate } from "./coordinate";
import { Velocity } from "./velocity";

export class Snake {
  private parts: Coordinate[];
  private isGrowing: boolean = false;

  constructor(segments: Coordinate[]) {
    this.parts = segments;
  }

  get head(): Coordinate {
    return { ...this.parts[this.parts.length - 1] };
  }

  get segments(): Coordinate[] {
    return [...this.parts];
  }

  move(direction: Velocity): void {
    const head = {
      x: this.head.x + direction.x,
      y: this.head.y + direction.y,
    };

    this.parts.push(head);
    if (!this.isGrowing) {
      this.parts = this.parts.slice(1);
    }

    this.isGrowing = false;
  }

  eat(): void {
    this.isGrowing = true;
  }

  isHitSelf(): boolean {
    return this.isCollidingCoordinates(this.head, this.parts, true);
  }

  isColliding(coordinate: Coordinate): boolean {
    return this.isCollidingCoordinates(coordinate, this.parts);
  }

  copy(): Snake {
    const snake = new Snake(this.parts);
    snake.isGrowing = this.isGrowing;
    return snake;
  }

  private isCollidingCoordinates(
    coordinate: Coordinate,
    segments: Coordinate[],
    skipHead: boolean = false
  ): boolean {
    return segments.some((segment, index) =>
      skipHead && index == segments.length - 1
        ? false
        : segment.x == coordinate.x && segment.y == coordinate.y
    );
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
