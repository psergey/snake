import { FC, memo } from "react";

import styles from "./Grid.module.scss";

const Grid: FC<{ size: number }> = ({
  size,
}: {
  size: number;
}): React.ReactElement => {
  const cells = [...Array(size * size)].map((_, i) => (
    <div className={styles.cell} key={i}></div>
  ));

  return <div className={styles.grid}>{cells}</div>;
};

export default memo(Grid);
