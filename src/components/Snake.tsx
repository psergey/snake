import { FC } from "react";

import { Segment } from "@models/segment";
import styles from "./Snake.module.scss";

const Snake: FC<Segment> = (item): React.ReactElement => {
  return (
    <div
      className={styles.snake}
      style={{
        gridRowStart: item.y,
        gridColumnStart: item.x,
      }}
    ></div>
  );
};

export default Snake;
