import { FC } from "react";
import styles from "./Snake.module.scss";
import { Segment } from "./models/segment";

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
