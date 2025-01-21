import { FC, useCallback, useState } from "react";

import { Snake as SnakeSprite } from "@models/snake";
import { BOARD_SIZE, SNAKE_SPEED } from "@models/constants";
import { useAnimationFrame } from "@hooks/useAnimationFrame";
import { useKeyboard } from "@hooks/useKeyboard";
import Grid from "./Grid";
import Snake from "./Snake";
import styles from "./Board.module.scss";

const Board: FC = (): React.ReactElement => {
  const [snake, setSnake] = useState(() => SnakeSprite.Create(BOARD_SIZE));
  const [velocity, setVelocity] = useState({ x: 1, y: 0 });

  const animate = useCallback(() => {
    setSnake((prev) => {
      const current = new SnakeSprite([...prev.segments]);
      current.move({
        x: velocity.x,
        y: velocity.y,
      });

      return current;
    });
  }, [velocity]);

  const keypressHandler = (event: KeyboardEvent) => {
    const keyPressed = event.code;

    const movingUp = velocity.y === -1;
    const movingDown = velocity.y === 1;
    const movingLeft = velocity.x === -1;
    const movingRight = velocity.x === 1;

    switch (true) {
      case keyPressed === "ArrowUp" && !movingDown:
        setVelocity({
          x: 0,
          y: -1,
        });
        break;
      case keyPressed === "ArrowDown" && !movingUp:
        setVelocity({
          x: 0,
          y: 1,
        });
        break;
      case keyPressed === "ArrowLeft" && !movingRight:
        setVelocity({
          x: -1,
          y: 0,
        });
        break;
      case keyPressed === "ArrowRight" && !movingLeft:
        setVelocity({
          x: 1,
          y: 0,
        });
        break;
    }
  };

  useKeyboard(keypressHandler);
  useAnimationFrame({
    nextAnimationFrameHandler: animate,
    framePerSeconds: SNAKE_SPEED / 4,
  });

  return (
    <div className={styles.board}>
      <Grid size={BOARD_SIZE} />
      {snake.segments.map((item, i) => (
        <Snake key={i} {...item} />
      ))}
    </div>
  );
};

export default Board;
