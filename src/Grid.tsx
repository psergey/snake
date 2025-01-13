import { FC } from "react";

import styles from "./Grid.module.scss";

const Grid: FC = (): React.ReactElement => {
  const cells = [...Array(10 * 10)].map(() => (
    <div className={styles.cell}></div>
  ));

  return <div className={styles.grid}>{cells}</div>;
};

export default Grid;
