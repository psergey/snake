import { FC } from "react";

import Board from "./Board";
import styles from "./Game.module.scss";

const Game: FC = (): React.ReactElement => {
  return (
    <div className={styles.game}>
      <Board />
    </div>
  );
};

export default Game;
