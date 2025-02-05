import {
  FC,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  BOARD_SIZE,
  FOOD_DESPAWN_THRESHOLD,
  FOOD_SPAWN_THRESHOLD,
  FOOD_TICK_INTERVAL,
  SNAKE_SPEED,
} from "@models/constants";
import useLocalStorage from "@hooks/useLocalStorage";
import { Coordinate } from "@models/coordinate";
import { GameContext } from "./useGameContext";
import { Score, SCORE_TABLE_MAX_SIZE } from "@/models/score";
import { Snake } from "@models/snake";
import { Velocity } from "@models/velocity";

const GameProvider: FC<PropsWithChildren> = ({ children }): ReactElement => {
  const [isPaused, setIsPaused] = useState(false);
  const [isMoving, setIsMoving] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [score, setScore] = useState(0);
  const [snake, setSnake] = useState(Snake.Create(BOARD_SIZE));
  const [direction, setDirection] = useState<Velocity>({ x: 1, y: 0 });
  const [food, setFood] = useState<Coordinate | null>();
  const frameRenderTick = useRef<number>(0);
  const foodLastSpawnTick = useRef<number>(0);
  const [topScores, setTopScores] = useLocalStorage<Score[]>(
    "snakeGameTopScores",
    []
  );

  useEffect(() => {
    setTopScores((prev) => [...prev].sort((a, b) => b.score - a.score));
  }, [setTopScores]);

  const start = () => {
    frameRenderTick.current = 0;
    foodLastSpawnTick.current = 0;
    setScore(0);
    setDirection({ x: 1, y: 0 });
    setSnake(Snake.Create(BOARD_SIZE));
    setIsOver(false);
    setIsPaused(false);
    setIsMoving(true);
  };

  const over = () => {
    setIsMoving(false);
    setIsOver(true);

    const currentScoreTable = [...topScores];
    currentScoreTable.push({ score: score, date: new Date() });
    currentScoreTable.sort((a, b) => b.score - a.score);

    setTopScores(currentScoreTable.slice(0, SCORE_TABLE_MAX_SIZE));
  };

  const pause = () => {
    setIsPaused((prev) => !prev);
  };

  const changeMovement = (position: Velocity) => {
    setDirection(position);
  };

  const animate = (elapsed: number): void => {
    if (isPaused) return;
    if (!isMoving) return;

    if (frameRenderTick.current == 0) frameRenderTick.current = elapsed;
    if (elapsed - frameRenderTick.current < SNAKE_SPEED) {
      return;
    }

    frameRenderTick.current = 0;

    if (isGameOver()) {
      over();
      return;
    }

    snake.move(direction);
    handleFood();
    setSnake(snake.copy());
  };

  const isGameOver = (): boolean => {
    const { x, y } = snake.head;
    return (
      snake.isHitSelf() || x < 1 || x > BOARD_SIZE || y < 1 || y > BOARD_SIZE
    );
  };

  const handleFood = (): void => {
    if (food && foodLastSpawnTick.current >= FOOD_DESPAWN_THRESHOLD) {
      foodLastSpawnTick.current = 0;
      setFood(null);
    }

    if (food && snake.isColliding(food)) {
      snake.eat();
      setFood(null);
      setScore((prev) => prev + 1);
      foodLastSpawnTick.current = 0;
    }

    if (!food && foodLastSpawnTick.current >= FOOD_SPAWN_THRESHOLD) {
      foodLastSpawnTick.current = 0;
      setFood(spawnFood());
    }

    foodLastSpawnTick.current += FOOD_TICK_INTERVAL;
  };

  const spawnFood = (): Coordinate => {
    let foodPosition: Coordinate;
    do {
      foodPosition = {
        x: ~~(Math.random() * BOARD_SIZE) + 1,
        y: ~~(Math.random() * BOARD_SIZE) + 1,
      };
    } while (snake.isColliding(foodPosition));

    return foodPosition;
  };

  return (
    <GameContext.Provider
      value={{
        score,
        highScore: topScores.length > 0 ? topScores[0].score : 0,
        isMoving,
        isPaused,
        isOver,
        snake,
        direction,
        start,
        over,
        pause,
        changeMovement,
        animate,
        food,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameProvider;
