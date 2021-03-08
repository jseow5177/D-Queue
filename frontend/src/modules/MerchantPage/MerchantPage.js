import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import ApiService from "../../common/services/api.service";

import MerchantDetails from "./MerchantDetails/MerchantDetails";
import QueueDialog from "../../common/modules/QueueDialog/QueueDialog";
import CustomLoading from "../../common/modules/CustomLoading/CustomLoading";

export default function MerchantPage(props) {
  const { match } = props;
  const [restaurantDetail, setRestaurantDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState(false);
  const user = useSelector((state) => state.auth);

  useEffect(async () => {
    let params = {
      restaurantID: match.params.name,
    };
    setLoading(true);
    let res = await ApiService.get("api/restaurant/retrieve", params);
    setRestaurantDetail(res.data);  
    setLoading(false);
  }, []);

  const buttonHandler = () => setDialog(true);

  return (
    <div>
      {loading ? (
        <CustomLoading />
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
