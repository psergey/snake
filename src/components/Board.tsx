import { FC } from "react";

//import { Snake as SnakeSprite } from "@models/snake";
import { BOARD_SIZE, BORDER_UNIT_SIZE } from "@models/constants";
import { useAnimationFrame } from "@hooks/useAnimationFrame";
import { useGameContext } from "@/hooks/useGameContext";
import { useKeyboard } from "@hooks/useKeyboard";
import Grid from "./Grid";
import Snake from "./Snake";
import styles from "./Board.module.scss";
import Food from "./Food";

const Board: FC = (): React.ReactElement => {
  const {
    isMoving,
    direction,
    changeMovement,
    start,
    pause,
    animate,
    snake,
    food,
  } = useGameContext();

  const handleKeyPressed = (keyCode: string) => {
    const movingUp = direction.y === -1;
    const movingDown = direction.y === 1;
    const movingLeft = direction.x === -1;
    const movingRight = direction.x === 1;

    switch (true) {
      case keyCode === "ArrowUp" && !movingDown:
        changeMovement({
          x: 0,
          y: -1,
        });
        break;
      case keyCode === "ArrowDown" && !movingUp:
        changeMovement({
          x: 0,
          y: 1,
        });
        break;
      case keyCode === "ArrowLeft" && !movingRight:
        changeMovement({
          x: -1,
          y: 0,
        });
        break;
      case keyCode === "ArrowRight" && !movingLeft:
        changeMovement({
          x: 1,
          y: 0,
        });
        break;
      case keyCode === "Enter":
        start();
        break;
      case keyCode === "Space":
        pause();
        break;
    }
  };

  useKeyboard(handleKeyPressed);
  useAnimationFrame({
    nextAnimationFrameHandler: animate,
    isActive: isMoving,
  });

  const boadStyle = {
    gridTemplateRows: `repeat(${BOARD_SIZE}, ${BORDER_UNIT_SIZE}px)`,
    gridTemplateColumns: `repeat(${BOARD_SIZE}, ${BORDER_UNIT_SIZE}px)`,
  };

  return (
    <div className={styles.board} style={boadStyle}>
      <Grid size={BOARD_SIZE} unitSize={BORDER_UNIT_SIZE} />
      {snake.segments.map((item, i) => (
        <Snake key={i} {...item} />
      ))}
      {food && <Food {...food} />}
    </div>
  );
};

export default Board;
