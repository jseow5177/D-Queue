import React from "react";
import styles from "./CardItem.module.scss";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
} from "@material-ui/core";
import { Link } from "react-router-dom";

export default function CardItem(props) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} xl={3}>
      <Card>
        <CardActionArea>
          {props.image && (
            <Link to={`/merchant/${props.id}`}>
              <CardMedia
                className={styles.cardImage}
                component="img"
                to={`/merchant/${props.id}`}
                image={props.image}
              ></CardMedia>
            </Link>
          )}
          <CardContent>
            <Typography variant="h5">{props.title}</Typography>
            <Typography variant="body2">{props.description}</Typography>
            <Typography variant="body2">
              Number of people in queue: {props.queueNum}
            </Typography>
          </CardContent>
        </CardActionArea>
        {(props.queue || props.info) && (
          <CardActions>
            {props.queue && <Button>Queue</Button>}
            {props.info && (
              <Button component={Link} to={`/merchant/${props.id}`}>
                More info
              </Button>
            )}
          </CardActions>
        )}
      </Card>
    </Grid>
  );
}
