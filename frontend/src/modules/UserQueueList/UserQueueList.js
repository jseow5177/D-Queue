import React from "react";

import { useWindowDimensions, mobileThreshold } from "../../common/utils";
import styles from "./UserQueueList.module.scss";

import { Grid } from "@material-ui/core";
import MerchantCard from "./MerchantCard/MerchantCard";
import SectionTitle from "../../common/modules/SectionTitle/SectionTitle";

const UserQueueList = () => {
  const { width } = useWindowDimensions();
  return (
    <div
      className={`${
        width <= mobileThreshold ? styles.mobileWidth : styles.desktopWidth
      } ${styles.listDiv}`}
    >
      <SectionTitle title="Queue List" />
      <Grid container spacing={5} className={styles.listGrid}>
        <Grid item className={styles.cardDiv}>
          <MerchantCard />
        </Grid>
        <Grid item>
          <MerchantCard />
        </Grid>
      </Grid>
    </div>
  );
};

export default UserQueueList;
