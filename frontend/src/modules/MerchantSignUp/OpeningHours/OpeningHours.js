import React from "react";
import { times, days } from "./DaysAndTimes";
import _ from "lodash";

import styles from "./OpeningHours.module.scss";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";

function EmptyComponent() {
  return <></>;
}

function SelectField(props) {
  return (
    <>
      <Grid item xs={props.xs} sm={props.sm} md={props.md} lg={props.lg} className={styles.selectFieldGridItem}>
        <FormControl variant="outlined" className={styles.textField}>
          <TextField
            fullWidth
            variant="outlined"
            select
            value={props.value}
            label={props.label}
            SelectProps={{
              IconComponent: EmptyComponent,
              classes: { root: styles.selectRoot, outlined: styles.selectOutlined, select: styles.select },
            }}
            onChange={props.changeHandler}
            InputLabelProps={{
              classes: {
                root: styles.labelRoot,
                focused: styles.labelFocusedColor,
              },
            }}
            InputProps={{
              classes: {
                root: styles.inputRoot,
                focused: styles.fieldFocusedColor,
                notchedOutline: styles.notchedOutline,
              },
            }}
          >
            {props.options.map((item, index) => {
              return (
                <MenuItem key={index} value={item.value}>
                  {item.text}
                </MenuItem>
              );
            })}
          </TextField>
        </FormControl>
      </Grid>
    </>
  );
}

function DayTimeField(props) {
  const { operatingHours, setOperatingHours } = props;

  function handleChange(index, fieldType){
    return (function(event) {
      setOperatingHours(prevVal => {
        const newVal = [...prevVal];

        //Set length to number of index
        if(index >= newVal.length)
          newVal.length = index + 1;
        
        //Add new empty object into the array location if undefined
        if(newVal[index] === undefined)
          newVal[index] = {day: "", opening: "", closing: ""};

        newVal[index][fieldType] = event.target.value;
        return newVal;
      })
    })
  }

  return (
    <>
      <Grid container justify="center" className={styles.dayTimeField}>
        <SelectField
          xs={4}
          md={3}
          changeHandler={handleChange(props.index, "day")}
          value={operatingHours[props.index] === undefined ? "" : operatingHours[props.index]["day"]}
          options={days}
          label="Day"
        />
        <SelectField
          xs={3}
          md={2}
          changeHandler={handleChange(props.index, "opening")}
          value={operatingHours[props.index] === undefined ? "" : operatingHours[props.index]["opening"]}
          options={times}
          label="Open"
        />
        <SelectField
          xs={3}
          md={2}
          changeHandler={handleChange(props.index, "closing")}
          value={operatingHours[props.index] === undefined ? "" : operatingHours[props.index]["closing"]}
          options={times}
          label="Close"
        />
      </Grid>
    </>
  );
}

export default function OpeningHours(props) {
  const { dayFields, setDayFields, operatingHours, setOperatingHours } = props;
  const fields = new Array(dayFields).fill(0);

  function clickHandler() {
    setDayFields((prevDays) => {
      return prevDays + 1;
    });
  }

  return (
    <div>
      {fields.map((item, index) => {
        return <DayTimeField index={index} key={index} operatingHours={operatingHours} setOperatingHours={setOperatingHours} />;
      })}
      <Button variant="outlined" onClick={clickHandler}>
        Add Day
      </Button>
    </div>
  );
}
