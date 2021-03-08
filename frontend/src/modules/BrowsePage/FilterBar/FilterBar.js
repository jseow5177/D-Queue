import React, {useEffect, useState} from "react";
import { IconButton, Grid, Paper, Typography } from "@material-ui/core";
import SortRoundedIcon from "@material-ui/icons/SortRounded";
import FilterTag from "../FilterTag/FilterTag";
import styles from "./FilterBar.module.scss";

const FilterBar = ({ setPopOverAnchor, filterState, updateFilter }) => {

  const [tags, setTags] = useState({})

  useEffect(() => {
    let newTags = {}
    Object.keys(filterState).map(category => {
      
      Object.keys(filterState[category]).map(option => {
        if (filterState[category][option]) {
          if (newTags[category]) {
            newTags[category].push(option)
          } else {
            newTags[category] = [option]
          }
        }
      })
    })

    setTags(newTags)
  }, [filterState]);

  const iconClickHandler = (e) => {
    e.preventDefault();
    setPopOverAnchor(true);
  };

  return (
    <div className={styles.filterBarDiv}>
      <Paper className={styles.filterBarContainer}>
        <Grid container alignItems="center" wrap="nowrap">
          <IconButton type="submit" onClick={iconClickHandler}>
            <SortRoundedIcon fontSize="default" />
          </IconButton>
          {Object.keys(tags).length === 0 ?
            (<Typography className={styles.filterBarPlaceholder}>Select filters</Typography>) :
            (
              <Grid container item spacing={2} justify="flex-start">
                {Object.keys(tags).map(category => {
                  return tags[category].map(option => {
                    return (<FilterTag title={option} category={category} updateFilter={updateFilter} />)
                  })
                  })  
                }
              </Grid>
            )}
        </Grid>
      </Paper>
    </div>
  );
};

export default FilterBar;
