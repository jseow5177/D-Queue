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

  Object.keys(filterOptions).map(categories => {
    filterState[categories] = {}
    return filterOptions[categories].map(option => {
      return filterState[categories][option] = false
    })
  });

  return filterState
};

const BrowsePage = ({match}) => {
  const windowDimensions = useWindowDimensions();
  const [restaurantList, setRestaurantList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageNum, setPageNum] = useState(1);
  const [popOverAnchor, setPopOverAnchor] = useState(false);
  const [filterState, setFilterState] = useState(getFilterState(filterOptions));
  const PAGE_SIZE = 20;

  const updateFilter = (key, filterOption, selected) => {
    const newFilter = {...filterState}
    newFilter[key][filterOption] = selected
    return setFilterState(newFilter);
  };

  useEffect(async () => {
    let category = match.params.category;
    if (category) {
      let newFilterState = { ...filterState };
      newFilterState["category"][category] = true;
      setFilterState(newFilterState);
    }

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

    let res = await ApiService.get("api/restaurant/restaurantList", params);
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
        filterState={filterState}
        gridItems={restaurantList}
        loading={loading}
      />
      <ButtonGroup variant="outlined" className={styles.buttonDiv}>
        <Button
          variant="outlined"
          className={styles.viewButton}
          onClick={updatePageNum}
        >
          <h2>View More</h2>
        </Button>
      </ButtonGroup>
    </div>
  );
};

export default BrowsePage;
