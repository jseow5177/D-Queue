import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

import ApiService from "../../common/services/api.service";
import { createSocket } from "../../sockets/sockets";
import styles from "./MerchantPage.module.scss";

import { CircularProgress } from "@material-ui/core";
import MerchantDetails from "./MerchantDetails/MerchantDetails";
import QueueDialog from "../../common/modules/QueueDialog/QueueDialog";

export default function MerchantPage(props) {
  let history = useHistory();
  const { match } = props;
  const [restaurantDetail, setRestaurantDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState(false);
  const user = useSelector((state) => state.auth);

  useEffect(async () => {
    let params = {
      restaurantId: match.params.name,
    };
    setLoading(true);
    let res = await ApiService.get("/restaurant/retrieve", params);
    setRestaurantDetail(res.data);
    setLoading(false);
  }, []);

  const buttonHandler = () => setDialog(true);

  return (
    <div>
      {loading ? (
        <CircularProgress className={styles.loadingIcon} />
      ) : (
        <>
          <QueueDialog
            dialog={dialog}
            setDialog={setDialog}
            user={user}
            restaurantDetail={restaurantDetail}
          />
          <MerchantDetails
            info={restaurantDetail}
            buttonHandler={buttonHandler}
          ></MerchantDetails>
        </>
      )}
    </div>
  );
}
