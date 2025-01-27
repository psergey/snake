import { FC, memo } from "react";

import styles from "./Grid.module.scss";

const Grid: FC<{ size: number; unitSize: number }> = ({
  size,
  unitSize,
}: {
  size: number;
  unitSize: number;
}): React.ReactElement => {
  const boardStyle = {
    gridTemplateRows: `repeat(${size}, ${unitSize}px)`,
    gridTemplateColumns: `repeat(${size}, ${unitSize}px)`,
  };
  const cellStyle = {
    width: `${unitSize}px`,
    height: `${unitSize}px`,
  };

  const cells = [...Array(size * size)].map((_, i) => (
    <div className={styles.cell} key={i} style={cellStyle}></div>
  ));

  return (
    <div className={styles.grid} style={boardStyle}>
      {cells}
    </div>
  );
};

export default memo(Grid);
