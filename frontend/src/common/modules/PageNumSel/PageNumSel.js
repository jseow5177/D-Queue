import React from "react";
import { Link } from "react-router-dom";
import styles from "./PageNumSel.module.scss";

import { Button, ButtonGroup } from "@material-ui/core";

const pageNums = [];

export default function PageNumSel(props) {
  return (
    <div className={styles.pageNumDiv}>
      <ButtonGroup className={styles.pageNumGroup} variant="outlined">
        {pageNums.map((num, index) => {
          return <Button key={index}>{num}</Button>;
        })}

        <Button variant="outlined" className={styles.button}>
          <Link className={styles.viewAllLink} to="browse"><h2>View More</h2></Link>
        </Button>
      </ButtonGroup>
    </div>
  );
}
