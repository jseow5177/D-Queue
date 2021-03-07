import React, { useEffect, useState } from "react";

import ApiService from "../../../common/services/api.service";

import CardGrid from "../../../common/modules/CardGrid/CardGrid";
import PageNumSel from "../../../common/modules/PageNumSel/PageNumSel";

export default function TrendingSummary(props) {
  const [loading, setLoading] = useState(false);
  const [restaurantList, setRestaurantList] = useState([]);

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
        spacing="10"
        gridItems={restaurantList}
        loading={loading}
        justify="flex-start"
      />
      <PageNumSel />
    </>
  );
}
