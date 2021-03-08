import React from "react";

import Button from "@material-ui/core/Button";
import styles from "./UploadPhotos.module.scss";
import { mobileThreshold } from "../../../common/utils";

import ImageSummarySection from "../../../common/modules/ImageSummarySection/ImageSummarySection";

const maxNumberOfImages = 4;

export default function UploadPhotos(props) {
  const { imageArr, setImageArr, rawImgArr, setRawImgArr } = props;

  function onUpload(event) {
    setImageArr((prevVal) => {
      const newImageArr = [...prevVal];
      Array.from(event.target.files).forEach((item) => {
        if (newImageArr.length < maxNumberOfImages)
          newImageArr.push(URL.createObjectURL(item));
      });
      return newImageArr;
    });

    const newRawImgArr = [...rawImgArr];
    Array.from(event.target.files).forEach((file) => {
      if (newRawImgArr.length < maxNumberOfImages) {
        newRawImgArr.push(file);
      }
    });

    setRawImgArr(newRawImgArr);
  }

  return (
    <div>
      <div
        className={`${styles.imagesDiv} ${
          props.width <= mobileThreshold ? styles.mobileImagesDiv : undefined
        }`}
      >
        <ImageSummarySection images={imageArr} />
      </div>
      <Button
        variant="contained"
        component="label"
        className={styles.uploadButton}
        disabled={imageArr.length >= maxNumberOfImages}
      >
        Add Photos
        <input
          hidden
          type="file"
          multiple={true}
          accept="image/*"
          onChange={onUpload}
        ></input>
      </Button>
    </div>
  );
}
