import React from "react";
import styles from "./PageNumSel.module.scss";

import { Button, ButtonGroup } from "@material-ui/core";

const pageNums = [1, 2, 3, 4];

export default function PageNumSel(props) {
  return (
    <div className={styles.pageNumDiv}>
      <ButtonGroup className={styles.pageNumGroup} variant="outlined">
        {pageNums.map((num, index) => {
          return <Button key={index}>{num}</Button>;
        })}
        <Button>View All</Button>
      </ButtonGroup>
    </div>
  );
}
