import React, { useEffect } from "react";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardMedia from "@material-ui/core/CardMedia";

import styles from "./ImageSummarySection.module.scss";
import { img_resize } from "../../utils";

function ImageRow(props) {
  return (
    <div className={styles.imagesRowContainer}>
      <Grid container className={styles.imageRow}>
        {props.images.map((image, index) => {
          if (index >= props.maxNum) return undefined;
          return (
            <Grid item xs key={index} className={styles.imageGridItem}>
              <Card
                elevation={
                  index === Number(props.currTitleImage) ? 8 : undefined
                }
              >
                <CardActionArea
                  onClick={props.onImageClick}
                  className={
                    index === Number(props.currTitleImage)
                      ? styles.selectedImage
                      : undefined
                  }
                >
                  <CardMedia image={image} component="img" id={index} />
                </CardActionArea>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
}

function TitleImage(props) {
  return (
    <div className={styles.imagesContainer}>
      <Card elevation={4}>
        <CardActionArea className={styles.titleImageActionArea}>
          <CardMedia image={props.image} component="img" />
        </CardActionArea>
      </Card>
    </div>
  );
}

export default function ImageSummarySection(props) {
  const [currTitleImage, setCurrTitleImage] = React.useState(0);
  const [images, setImages] = React.useState([]);
  function onImageClick(event) {
    setCurrTitleImage(event.target.id);
  }

  const { images: imageArr } = props;

  useEffect(() => {
    const imgArr = [];
    imageArr.map((img) => {
      if (img.includes("cloudinary")) {
        img = img_resize(img, "w_400,h_350,c_fill/");
      }
      imgArr.push(img);
    });
    setImages(imgArr);
  }, [imageArr]);

  return (
    <>
      <TitleImage image={images[currTitleImage]} />
      <ImageRow
        images={images}
        currTitleImage={currTitleImage}
        onImageClick={onImageClick}
        maxNum={props.maxNum}
      />
    </>
  );
}
