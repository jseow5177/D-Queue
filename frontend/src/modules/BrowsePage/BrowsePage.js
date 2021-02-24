import React, { useState, useEffect } from "react";

import ApiService from "../../common/services/api.service";
import { filterOptions } from "../../constants/tempDB";
import styles from "./BrowsePage.module.scss";
import { useWindowDimensions } from "../../common/utils";

import { Backdrop, Button, ButtonGroup } from "@material-ui/core";
import CardGrid from "../../common/modules/CardGrid/CardGrid";
import FilterBar from "./FilterBar/FilterBar";
import FilterPopOver from "./FilterPopOver/FilterPopOver";
import SectionTitle from "../../common/modules/SectionTitle/SectionTitle";

const getFilterState = (filterOptions) => {
  let filterState = {};

  Object.keys(filterOptions).map((categories) => {
    return filterOptions[categories].map((option) => {
      return (filterState[option] = false);
    });
  });

  return filterState;
};

const BrowsePage = () => {
  const windowDimensions = useWindowDimensions();
  const [restaurantList, setRestaurantList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [popOverAnchor, setPopOverAnchor] = useState(false);
  const [filterState, setFilterState] = useState(getFilterState(filterOptions));
  const PAGE_SIZE = 2;
  const updateFilter = (filterOption, selected) => {
    return setFilterState({ ...filterState, [filterOption]: selected });
  };

  useEffect(async () => {
    let params = {
      page_num: 1,
      page_size: PAGE_SIZE,
    };
    setLoading(true);
    let res = await ApiService.get("/restaurant/restaurantList", params);

    setLoading(false);
    setRestaurantList(res.data);
  }, []);

  const updatePageNum = async () => {
    let params = {
      page_num: pageNum + 1,
      page_size: PAGE_SIZE,
    };

    let res = await ApiService.get("/restaurant/restaurantList", params);
    setRestaurantList([...restaurantList, ...res.data]);
    setPageNum(pageNum + 1);
  };

  return (
    <div>
      <SectionTitle title="Say no to queuing" />
      <FilterBar
        filterState={filterState}
        setPopOverAnchor={setPopOverAnchor}
        updateFilter={updateFilter}
      />
      <Backdrop open={popOverAnchor} className={styles.backdrop}></Backdrop>
      <FilterPopOver
        filterState={filterState}
        popOverAnchor={popOverAnchor}
        setPopOverAnchor={setPopOverAnchor}
        updateFilter={updateFilter}
        windowDimensions={windowDimensions}
      />
      <CardGrid
        justify="flex-start"
        spacing="6"
        gridItems={restaurantList}
        loading={loading}
      />
      <ButtonGroup variant="outlined" className={styles.buttonDiv}>
        <Button className={styles.viewButton} onClick={updatePageNum}>
          View More
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default BrowsePage;
