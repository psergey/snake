import { FC } from "react";

import Snake from "./Snake";
import { Item } from "./Item.type";
import styles from "./Board.module.scss";
import Grid from "./Grid";

const Board: FC = (): React.ReactElement => {
  const snake: Item[] = [
    {
      x: 1,
      y: 1,
    },
    {
      x: 2,
      y: 1,
    },
  ];

  return (
    <div className={styles.board}>
      <Grid />
      {snake.map((item) => (
        <Snake {...item} />
      ))}
    </div>
  );
};

export default Board;
