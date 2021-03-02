import React, { useState } from "react";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

import styles from "./CustomerCard.module.scss";
import { QUEUESTATE } from "../../../constants/config";
import ApiService from "../../../common/services/api.service";

export default function CustomerCard({ queue }) {
  const [queueState, setQueueState] = useState(queue.state);
  const updateHandler = async (state) => {
    const payload = {
      userID: queue.user._id,
      restaurantID: queue.restaurant,
      queueState: state,
    };

    const res = await ApiService.post("/restaurant/updateQueueState", payload);
    console.log(res);

    if (res.status === 200) {
      setQueueState(state);
    }
  };
  return (
    <>
      <Paper
        className={styles.customerCardContainer}
        classes={{ root: styles.paperRoot }}
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <div className={styles.customerDescriptionDiv}>
              <Typography>
                Name: {queue.user.first_name + " " + queue.user.last_name}
              </Typography>
              <Typography>Pax: {queue.pax}</Typography>
              <Typography>Queue Time: {queue.enter_queue_time}</Typography>
              <Typography>Status: {QUEUESTATE[queueState]}</Typography>
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <div className={styles.buttonDiv}>
              <Button
                variant="contained"
                className={styles.actionButton}
                onClick={() => {
                  updateHandler(QUEUESTATE["NOTIFIED"]);
                }}
              >
                Notify
              </Button>
              <Button
                variant="contained"
                className={styles.actionButton}
                onClick={() => {
                  updateHandler(QUEUESTATE["ENTERED"]);
                }}
              >
                Entered
              </Button>
              <Button
                variant="contained"
                className={styles.actionButton}
                onClick={() => {
                  updateHandler(QUEUESTATE["SKIPPED"]);
                }}
              >
                Cancel
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
