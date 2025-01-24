import { FC } from "react";

import { Coordinate } from "@/models/coordinate";
import styles from "./Food.module.scss";

const Food: FC<Coordinate> = (item): React.ReactElement => {
  return (
    <div
      className={styles.food}
      style={{
        gridRowStart: item.y,
        gridColumnStart: item.x,
      }}
    ></div>
  );
};

export default Food;
