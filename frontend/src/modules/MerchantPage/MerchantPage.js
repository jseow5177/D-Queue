import React, { useState, useEffect } from "react";

import ApiService from "../../common/services/api.service";
import styles from "./MerchantPage.module.scss"

import { CircularProgress} from "@material-ui/core";
import MerchantDetails from "./MerchantDetails/MerchantDetails";

export default function MerchantPage(props) {
  const { match } = props;
  const [restaurantDetail, setRestaurantDetail] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    let params = {
      restaurantId: match.params.name,
    };
    setLoading(true);
    let res = await ApiService.get("/restaurant/retrieve", params);
    setRestaurantDetail(res.data);
    setLoading(false);
  }, []);

  return (
    <div>
      {loading ? (
        <CircularProgress className={styles.loadingIcon}/>
      ) : (
        <MerchantDetails info={restaurantDetail}></MerchantDetails>
      )}
    </div>
  );
}
