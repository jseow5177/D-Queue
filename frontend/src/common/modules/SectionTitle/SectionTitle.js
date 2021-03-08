import React from "react";
import { Grid, Paper, Typography } from "@material-ui/core";

import styles from "./SectionTitle.module.scss";

export default function SectionTitle(props) {
  return (
    <div>
      <Grid container justify="center">
        <Grid item>
          <Paper className={styles.sectionTitle} component="div">
            <h3 variant="h5" align="center" className={styles.text}>
              {props.title}
            </h3>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
