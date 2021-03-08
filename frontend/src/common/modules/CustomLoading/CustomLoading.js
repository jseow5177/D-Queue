import { CircularProgress, Typography } from "@material-ui/core";
import React from "react";
import styles from "./CustomLoading.module.scss";

const CustomLoading = ({ message }) => {
  return (
    <div className={styles.loadingDiv}>
      <div className={styles.loadingContainer}>
        <Typography variant="h6">{message}</Typography>
        <CircularProgress />
      </div>
    </div>
  );
};

export default CustomLoading;
