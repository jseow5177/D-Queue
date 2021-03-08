import React, { useEffect, useState } from "react";

import ApiService from "../../common/services/api.service";
import { useWindowDimensions, mobileThreshold } from "../../common/utils";
import styles from "./UserQueueList.module.scss";

import { Grid, CircularProgress, IconButton } from "@material-ui/core";
import MerchantCard from "./MerchantCard/MerchantCard";
import SectionTitle from "../../common/modules/SectionTitle/SectionTitle";
import { getSocket, deleteSocket } from "../../sockets/sockets";

const UserQueueList = (props) => {
  const { params } = props.match;
  const { width } = useWindowDimensions();
  const [queueList, setQueueList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const getQueueList = async () => {
      const payload = { userID: params.id };
      const res = await ApiService.post("/user/queueList", payload);
      if (res.status === 200) {
        setQueueList(res.data);
      }
      return res.data;
    };

    setLoading(true);
    let data = await getQueueList();
    setLoading(false);
  }, []);

  useEffect(() => {
    const socket = getSocket(params.id);
    socket.on("update queue", (args) => {
      const { restaurant, state } = args;
      var index;
      for (var i = 0; i < queueList.length; i++) {
        if (queueList[i].restaurant._id === restaurant) {
          index = i;
          break;
        }
      }

      if (index === undefined) {
        return;
      } else {
        if (state > 1) {
          setQueueList((prev) => {
            return prev.filter((item) => {
              return item.restaurant._id !== restaurant;
            });
          });
        } else {
          setQueueList((prev) => {
            prev[index] = args;
            return prev;
          });
        }
      }
    });
  }, [queueList]);

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
