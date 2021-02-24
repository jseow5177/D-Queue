import React, { useEffect, useState } from "react";

import ApiService from "../../../common/services/api.service";

import CardGrid from "../../../common/modules/CardGrid/CardGrid";
import PageNumSel from "../../../common/modules/PageNumSel/PageNumSel";

export default function TrendingSummary(props) {
  const [restaurantList, setRestaurantList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    let params = {
      page_num: 1,
      page_size: 10,
    };
    setLoading(true);
    let res = await ApiService.get("/restaurant/restaurantList", params);

    setLoading(false);
    setRestaurantList(res.data);
  }, []);

  return (
    <>
      <CardGrid
        spacing="6"
        gridItems={restaurantList}
        loading={loading}
        justify="flex-start"
      />
      <PageNumSel />
    </>
  );
}
