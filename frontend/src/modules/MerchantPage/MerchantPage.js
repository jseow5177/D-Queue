import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
=======

>>>>>>> store_img
import ApiService from "../../common/services/api.service";
import styles from "./MerchantPage.module.scss"

import { CircularProgress} from "@material-ui/core";
import MerchantDetails from "./MerchantDetails/MerchantDetails";

export default function MerchantPage(props) {
  let history = useHistory();
  const { match } = props;
  const [restaurantDetail, setRestaurantDetail] = useState({});
  const [loading, setLoading] = useState(true);
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

  const queueHandler = async () => {
    const payload = {
      userID: user._id,
      restaurantID: restaurantDetail._id,
      pax: 3,
    };

    try {
      let res = await ApiService.post("/user/enterQueue", payload);
    } catch (error) {
      console.log(error.message);
    }

    history.push(`/user/queueList/${user._id}`);
  };

  return (
<<<<<<< HEAD
    <>
      <MerchantDetails
        info={restaurantDetail}
        images={marcheImages}
        queueHandler={queueHandler}
      ></MerchantDetails>
    </>
=======
    <div>
      {loading ? (
        <CircularProgress className={styles.loadingIcon}/>
      ) : (
        <MerchantDetails info={restaurantDetail}></MerchantDetails>
      )}
    </div>
>>>>>>> store_img
  );
}
