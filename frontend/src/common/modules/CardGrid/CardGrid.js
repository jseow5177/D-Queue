import React, {useState, useEffect} from "react";
import { CircularProgress, Grid } from "@material-ui/core";

import styles from "./CardGrid.module.scss";
import CardItem from "../CardItem/CardItem";
import { img_resize } from "../../utils";

export default function CardGrid({filterState, spacing, gridItems, loading, justify}) {
  const [filteredItems, setFilteredItems] = useState([])
  const [filterCriterias, setFilterCriterias] = useState({})

  useEffect(() => {
    const newFilterCriterias = {}

    if(filterState) {
      Object.keys(filterState).map((category) => {
        newFilterCriterias[category] = [];

        Object.keys(filterState[category]).map((option) => {
          if (filterState[category][option]) {
            newFilterCriterias[category].push(option);
          }
        });
      });

      setFilterCriterias(newFilterCriterias);
    }
  }, [filterState])

  useEffect(() => {
    let newFilteredItems = [...gridItems]

    Object.keys(filterCriterias).map(category => {
      if (filterCriterias[category].length === 0) {
        return null
      }

      newFilteredItems = newFilteredItems.filter(item => {
        let include = false
        filterCriterias[category].forEach((option) => {
          
          if (item[category] === option) {            
            include = true;
          }
        });
      
        return include;
      })
    })

    setFilteredItems(newFilteredItems)
  }, [filterCriterias, gridItems])
  
  return (
    <div className={styles.cardGrid}>
      <Grid container spacing={Number(spacing)} justify={justify}>
        {loading ? (
          <CircularProgress className={styles.loadingIcon} />
        ) : (
          filteredItems.map((item, index) => {
            return (
              <CardItem
                key={index}
                id={item._id}
                description={
                  item.address1 +
                  " " +
                  item.postCode
                }
                title={item.restaurantName}
                queueNum={item.queueNum}
                queue={true}
                info={true}
                image={img_resize(
                  item.image[0],
                  "w_300,h_250,c_fill/"
                )}
              />
            );
          })
        )}
      </Grid>
    </div>
  );
}
