import { Grid } from "@material-ui/core";
import React from "react";
import CheckBox from "../CheckBox/CheckBox";

const CheckBoxGrid = ({ options, filterState, updateFilter, subtitle}) => {
  return (
    <div>
      <Grid container>
        {options.map((option, index) => {
          return (
            <CheckBox
              key={index}
              option={option}
              filterState={filterState}
              subtitle={subtitle}
              updateFilter={updateFilter}
            />
          );
        })}
      </Grid>
    </div>
  );
};

export default CheckBoxGrid;
