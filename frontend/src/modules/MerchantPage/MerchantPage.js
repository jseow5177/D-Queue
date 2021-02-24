import React, { useState, useEffect } from "react";
import ApiService from "../../common/services/api.service";

import MerchantDetails from "./MerchantDetails/MerchantDetails";

const marcheImages = [
  "https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHw%3D&w=1000&q=80",
  "https://media.marche-movenpick.com/karmarun//image/upload/q_60,w_1600,h_1024,c_fill/marche/rJ9U_zxbD-Breakfast%20Favourites%20-%20Feature%20all%20breakfast%20deals%20and%20menu.jpg",
  "https://media.marche-movenpick.com/karmarun//image/upload/q_60,w_1600,h_1024,c_fill/marche/By8DVlYZw-Promotions.jpg",
  "https://media.marche-movenpick.com/karmarun//image/upload/q_60,w_1600,h_1024,c_fill/marche/SykMS2tvI-Online%20delivery%20ver2.jpg",
];

const info = {
  location: "Bishan",
  phone: "123456789",
  currentNumber: 1,
  averageWaiting: 40,
};

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
    console.log(res.data);
    setRestaurantDetail(res.data);
    setLoading(false);
  }, []);

  return (
    <>
      <MerchantDetails
        info={restaurantDetail}
        images={marcheImages}
      ></MerchantDetails>
    </>
  );
}
