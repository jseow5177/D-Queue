import { IconButton, Typography } from "@material-ui/core";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import React from "react";
import styles from "./AddRestaurant.module.scss";
import { Link } from "react-router-dom";

const AddRestaurant = () => {
  return (
    <div className={styles.contentDiv}>
      <div className={styles.contentContainer}>
        <div>
          <Typography variant="h4">
            Oopss! You don't have a restaurant yet
          </Typography>
        </div>
        <div>
          <Typography variant="h5"> Click to add one! </Typography>{" "}
        </div>
        <div>
          <IconButton component={Link} to="/merchant-sign-up">
            <AddCircleIcon fontSize="large" />
          </IconButton>
        </div>
      </div>
    </div>
  );
};

export default AddRestaurant;
