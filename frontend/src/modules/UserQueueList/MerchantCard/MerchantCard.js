import { Link } from "react-router-dom";
import React, { useState } from "react";

import ApiService from "../../../common/services/api.service";
import { QUEUESTATE } from "../../../constants/config";
import styles from "./MerchantCard.module.scss";

import { Button, Grid, Paper, Typography } from "@material-ui/core";

const MerchantCard = ({ info, queueList, setQueueList }) => {
  let { restaurant, pax, queueNum } = info;

  const cancelHandler = async () => {
    const payload = {
      userID: info.user,
      restaurantID: restaurant._id,
      queueState: QUEUESTATE.SKIPPED,
    };

    const res = await ApiService.put("/restaurant/updateQueueState", payload);
    if (res.status === 200) {
      const newList = queueList.filter(
        (queueInfo) => queueInfo._id !== info._id
      );
      setQueueList(newList);
    }
  };

  return (
    <Grid item>
      <Paper elevation={5} className={styles.cardContainer}>
        <Grid container>
          <Grid item xs={4} md={3}>
            <Link to={`/merchant/${restaurant._id}`}>
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
              <Typography variant="h4">{restaurant.restaurantName}</Typography>
              <Typography variant="body2" color="textSecondary">
                {`Contact no: ${restaurant.contact}`}
              </Typography>
              <hr />
              <br />
              <Typography>{`Pax: ${pax}`}</Typography>
              <Typography>{`Number of people in queue: ${queueNum}`}</Typography>
            </Grid>
            <Grid item>
              <Button variant="contained" onClick={cancelHandler}>
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default MerchantCard;
