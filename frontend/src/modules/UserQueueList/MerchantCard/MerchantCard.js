import { Link } from "react-router-dom";
import React from "react";

import styles from "./MerchantCard.module.scss";

import { Button, Grid, Paper, Typography } from "@material-ui/core";

const MerchantCard = () => {
  return (
    <div>
      <Paper elevation={5}>
        <Grid container>
          <Grid item xs={4} md={3}>
            <Link to="/merchant/xxx">
              <img
                className={styles.cardImg}
                src="https://ucarecdn.com/6c3107c4-7564-429a-acb0-f0d833355982/"
              />
            </Link>
          </Grid>
          <Grid
            item
            container
            xs={8}
            md={9}
            direction="column"
            className={styles.cardInfoDiv}
          >
            <Grid item className={styles.cardInfo}>
              <Typography variant="h4">Marche</Typography>
              <Typography variant="body2" color="textSecondary">
                Location: Vivo City
              </Typography>
              <hr />
              <br />
              <Typography>Phone number: xxxx</Typography>
              <Typography>Number of person in queue: 4</Typography>
            </Grid>
            <Grid item>
              <Button variant="contained"> Cancel</Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
};

export default MerchantCard;
