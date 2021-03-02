import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./MerchantDashboard.module.scss";
import { useSelector } from "react-redux";
import { useWindowDimensions, mobileThreshold } from "../../common/utils";

import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import AddCircleIcon from "@material-ui/icons/AddCircle";

import CustomerCard from "./CustomerCard/CustomerCard";
import ApiService from "../../common/services/api.service";
import { socketObj } from "../../sockets/sockets";
import { IconButton } from "@material-ui/core";

export default function MerchantDashboard(props) {
  const { width } = useWindowDimensions();
  const { params } = props.match;

  const user = useSelector((state) => state.auth);

  const [currTab, setCurrTab] = useState(1);
  const [loading, setLoading] = useState(false);
  const [queueList, setQueueList] = useState([]);

  const handleChange = (event, newValue) => {
    setCurrTab(newValue);
  };

  useEffect(async () => {
    const params = {
      restaurantID: user.restaurant,
    };

    const res = await ApiService.get("/restaurant/queueList", params);

    if (res.status === 200) {
      setQueueList(res.data);
    }

    setLoading(false);

    const restaurantSocket = socketObj["/" + user.restaurant];

    if (restaurantSocket !== undefined) {
      restaurantSocket.on("user enter queue", (arg) => {
        setQueueList((prev) => {
          return [...prev, arg];
        });
      });

      restaurantSocket.on("update queue", (arg) => {
        setQueueList((prev) => {
          return prev.filter((item) => {
            return item.user._id !== arg.user;
          });
        });
      });
    }
  }, []);

  return (
    <div>
      <Paper
        className={`${width <= mobileThreshold && styles.mobileQueueList} ${
          styles.restaurantNamePaper
        }`}
        elevation={3}
        square={width <= mobileThreshold}
      >
        <div className={styles.restaurantName}>
          <Typography variant="h3">{params.name}</Typography>
        </div>
      </Paper>
      <Paper
        className={`${styles.queueListPaper} ${
          width <= mobileThreshold && styles.mobileQueueList
        }`}
        elevation={3}
        square={width <= mobileThreshold}
      >
        <Tabs
          value={currTab}
          onChange={handleChange}
          orientation="vertical"
          classes={{
            root: styles.tabsRoot,
            indicator: styles.tabsIndicator,
          }}
        >
          <Tab
            label="Pax Size"
            disabled
            classes={{
              root: styles.singleTabRoot,
              wrapper: styles.singleTabWrapper,
              disabled: styles.tabDisabled,
            }}
          />
          <Tab
            label="1 - 2 pax"
            classes={{
              root: styles.singleTabRoot,
              wrapper: styles.singleTabWrapper,
            }}
          />
          <Tab
            label="3 - 4 pax"
            classes={{
              root: styles.singleTabRoot,
              wrapper: styles.singleTabWrapper,
            }}
          />
          <Tab
            label="5 - 6 pax"
            classes={{
              root: styles.singleTabRoot,
              wrapper: styles.singleTabWrapper,
            }}
          />
          <Tab
            label="> 6 pax"
            classes={{
              root: styles.singleTabRoot,
              wrapper: styles.singleTabWrapper,
            }}
          />
        </Tabs>
        <Grid container className={styles.customerCardContainer} justify="left">
          {queueList.map((queue) => {
            return (
              <Grid item xs={12} lg={6}>
                <CustomerCard queue={queue} />
              </Grid>
            );
          })}
        </Grid>
      </Paper>
    </div>
  );
}
