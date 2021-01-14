import React from "react";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import styles from "./BasicInfoFields.module.scss";

function CustomTextField(props) {
  return (
    <Grid item className={styles.inputGridItem} xs={12} md={props.width === "full" ? 12 : 6}>
      <TextField
        value={props.merchantInfo[props.id] || ""}
        className={styles.inputField}
        id={props.id}
        variant="outlined"
        label={props.label}
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
      />
    </Grid>
  );
}

function generateFieldProps(label, width) {
  return { label: label, width: width };
}

const fieldWidthPair = {
  "Restaurant Name": "full",
  "Address Line 1": "full",
  "Address Line 2": "full",
  "City": "half",
  "State": "half",
  "Country": "half",
  "Post Code": "half",
  "Contact Number": "full",
  "Email": "full"
}

const fieldProps = Object.keys(fieldWidthPair).map(key => generateFieldProps(key, fieldWidthPair[key]));

export default function BasicInfoFields(props) {
  const { merchantInfo, setMerchantInfo } = props;
  function changeHandler(event) {
    setMerchantInfo((prevVal) => {
      const newItem = { ...prevVal };
      newItem[event.target.id] = event.target.value;

      return newItem;
    });
  }

  return (
    <div className={styles.basicInfoDiv}>
      <Grid container>
        {fieldProps.map((item, index) => {
          return (
            <CustomTextField
              key={index}
              label={item.label}
              width={item.width}
              id={item.label}
              merchantInfo={merchantInfo}
              setMerchantInfo={setMerchantInfo}
              changeHandler={changeHandler}
            />
          );
        })}
      </Grid>
    </div>
  );
}