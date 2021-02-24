import React from "react";
import { CircularProgress, Grid } from "@material-ui/core";

import styles from "./CardGrid.module.scss";
import CardItem from "../CardItem/CardItem";

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
                image="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8M3x8fGVufDB8fHw%3D&w=1000&q=80"
              />
            );
          })
        )}
      </Grid>
    </div>
  );
}
