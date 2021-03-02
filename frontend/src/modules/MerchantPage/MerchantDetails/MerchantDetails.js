import React from "react";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styles from "./MerchantDetails.module.scss";
import ImageSummarySection from "../../../common/modules/ImageSummarySection/ImageSummarySection";

function MerchantDescription(props) {
  return (
    <div className={styles.merchantDescContainer}>
      <Typography variant="h4">{props.info.restaurantName}</Typography>
      <Typography className={styles.descField} variant="body1">
        Location: {props.info.address1 + " " + props.info.postCode}
      </Typography>
      <Typography className={styles.descField} variant="body1">
        Phone: {props.info.contact}
      </Typography>
      <Typography className={styles.descField} variant="body1">
        Current Serving Number: {props.info.currentNumber}
      </Typography>
      <Typography className={styles.descField} variant="body1">
        Average Waiting time: {props.info.averageWaiting} minutes
      </Typography>
      <Button
        className={styles.queueBtn}
        onClick={props.buttonHandler}
        variant="contained"
      >
        Queue
      </Button>
    </div>
  );
}

export default function MerchantDetails(props) {
  return (
    <div>
      <Paper className={styles.merchantPaper}>
        <Grid container justify="flex-start">
          <Grid item sm={12} md={6}>
            <ImageSummarySection images={props.info.image} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <MerchantDescription
              info={props.info}
              merchantName={props.info.restaurantName}
              buttonHandler={props.buttonHandler}
            />
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
