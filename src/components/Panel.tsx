import { FC } from "react";

import { useGameContext } from "@/hooks/useGameContext";
import styles from "./Panel.module.scss";

const Panel: FC = (): React.ReactElement => {
  const { start, over, isOver, isMoving, score, highScore } = useGameContext();

  return (
    <div className={styles.panel}>
      <p className={styles.score}>High Score: {highScore}</p>

      <p className={styles.score}>Current Score:</p>
      <p className={styles.score}>{score}</p>

      <div className={styles.action}>
        <button
          className={`btn ${styles.action}`}
          onClick={!isMoving ? start : over}
        >
          {!isMoving && !isOver && "Start"}
          {isMoving && "End"}
          {isOver && "Restart"}
        </button>
      </div>
    </div>
  );
};

export default Panel;
