import { FC } from "react";
import styles from "./Game.module.scss";
import Board from "./Board";

const Game: FC = (): React.ReactElement => {
  return (
    <div className={styles.game}>
      <Board />
    </div>
  );
};

export default Game;
