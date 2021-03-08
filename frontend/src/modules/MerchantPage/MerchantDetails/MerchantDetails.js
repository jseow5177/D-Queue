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
      <h1 className={styles.descTitle}>{props.info.restaurantName}</h1>
      <hr />
      <p className={styles.descContent}>
        Location: {props.info.address1 + " " + props.info.postCode}
      </p>
      <p className={styles.descContent}>Phone: {props.info.contact}</p>
      <p className={styles.descContent}>
        Number of people in queue: {props.info.queueNum}
      </p>
      <Button
        className={styles.queueBtn}
        onClick={props.buttonHandler}
        variant="contained"
      >
        <h1>Queue</h1>
      </Button>
    </div>
  );
}

export default function MerchantDetails(props) {
  return (
    <div className={styles.merchantContainer}>
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
