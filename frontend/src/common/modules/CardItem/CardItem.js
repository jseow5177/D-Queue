import React from "react";
import styles from "./CardItem.module.scss";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";

export default function CardItem(props) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={3} className={styles.cardDiv}>
      <Card className={styles.cardItem}>
      <Link className={styles.cardLink} to={`/merchant/${props.id}`}>
        <CardActionArea>
          {props.image && (
            
              <CardMedia
                className={styles.cardImage}
                component="img"
                to={`/merchant/${props.id}`}
                image={props.image}
              ></CardMedia>
            
          )}
          <CardContent>
            <h1 className={styles.cardTitle}>{props.title}</h1>
            <p className={styles.cardSubtitle}>{props.description}</p>
            <p className={styles.cardSubtitle}>
              People queuing: {props.queueNum}
            </p>
          </CardContent>
        </CardActionArea>
        </Link>
      </Card>
    </Grid>
  );
}
