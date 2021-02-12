import React, { useEffect, useState } from "react";

import ApiService from "../../common/services/api.service";
import { useWindowDimensions, mobileThreshold } from "../../common/utils";
import styles from "./UserQueueList.module.scss";

import { Grid, CircularProgress } from "@material-ui/core";
import MerchantCard from "./MerchantCard/MerchantCard";
import SectionTitle from "../../common/modules/SectionTitle/SectionTitle";

const UserQueueList = (props) => {
  const { params } = props.match;
  const { width } = useWindowDimensions();
  const [queueList, setQueueList] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const getQueueList = async () => {
      const payload = { userID: params.id };
      const res = await ApiService.post("/user/queueList", payload);
      if (res.status === 200) {
        setQueueList(res.data);
      }
    };

    setLoading(true);
    await getQueueList();
    setLoading(false);

    const interval = setInterval(async () => {
      await getQueueList();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`${width <= mobileThreshold && styles.mobileWidth} ${
        styles.listDiv
      }`}
    >
      <SectionTitle title="Queue List" />
      <Grid container spacing={5} className={styles.listGrid}>
        {loading ? (
          <CircularProgress className={styles.loadingGrid} />
        ) : (
          queueList.map((queueInfo, index) => {
            return (
              <MerchantCard
                key={index}
                info={queueInfo}
                queueList={queueList}
                setQueueList={setQueueList}
              />
            );
          })
        )}
      </Grid>
    </div>
  );
};

export default UserQueueList;
