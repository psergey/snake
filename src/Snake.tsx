import { FC } from "react";
import styles from "./Snake.module.scss";
import { Item } from "./Item.type";

const Snake: FC<Item> = (item): React.ReactElement => {
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
