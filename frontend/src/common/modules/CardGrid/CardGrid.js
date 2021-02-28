import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";

import styles from "./CardGrid.module.scss";
import CardItem from "../CardItem/CardItem";
import { buffer_to_blobUrl } from "../../utils";

export default function CardGrid(props) {
  
  return (
    <div className={styles.cardGrid}>
      <Grid container spacing={Number(props.spacing)} justify={props.justify}>
        {props.loading ? (
          <CircularProgress className={styles.loadingIcon} />
        ) : (
          props.gridItems.map((item, index) => {
            return (
              <CardItem
                key={index}
                id={item._id}
                description={item.address1 + " " + item.postCode}
                title={item.restaurantName}
                queue={true}
                info={true}
                image={item.image[0] && buffer_to_blobUrl(item.image[0].data)}
              />
            );
          })
        )}
      </Grid>
    </div>
  );
}
