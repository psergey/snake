import { FC } from "react";

import Board from "./Board";
import Panel from "./Panel";
import styles from "./Game.module.scss";

const Game: FC = (): React.ReactElement => {
  return (
    <div className={styles.game}>
      <Board />
      <Panel />
    </div>
  );
};

export default Game;
