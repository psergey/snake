import { Coordinate } from "./coordinate";
import { Snake } from "./snake";
import { Velocity } from "./velocity";

export interface GameState {
  score: number;
  highScore: number;
  isMoving: boolean;
  isPaused: boolean;
  isOver: boolean;
  snake: Snake;
  food?: Coordinate | null;
  direction: Velocity;
  animate(elapsed: number): void;
  start(): void;
  over(): void;
  pause(): void;
  changeMovement(position: Velocity): void;
}
