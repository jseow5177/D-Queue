import React from "react";
import styles from "./MerchantSignUp.module.scss";
import { useWindowDimensions } from "../../common/utils";

import DesktopStepper from "./DesktopStepper/DesktopStepper";
import BasicInfoFields from "./BasicInfoFields/BasicInfoFields";
import OpeningHours from "./OpeningHours/OpeningHours";
import UploadPhotos from "./UploadPhotos/UploadPhotos";
import Review from "./Review/Review";
import { generateStepContent } from "./StepContent";
import { sortOperatingHours } from "./SortOperatingHours";

import ApiService from "../../common/services/api.service.js";

export default function MerchantSignUp() {
  //Get width for determining whether to use mobile or desktop stepper for signup page
  const { width } = useWindowDimensions();
  const [merchantInfo, setMerchantInfo] = React.useState({});
  const [operatingHours, setOperatingHours] = React.useState([]);
  const [imageArr, setImageArr] = React.useState([]);
  const [rawImgArr, setRawImgArr] = React.useState([]);
  const [verifier, setVerifier] = React.useState();

  const submitForm = React.useCallback(async () => {
    const sortedOperatingHours = sortOperatingHours(operatingHours);
    const concatData = {
      ...merchantInfo,
      openingHours: sortedOperatingHours,
      admin: "false",
    };

    let data = new FormData();

    for (let key in concatData) {
      data.append(key, concatData[key]);
    }

    rawImgArr.forEach((img) => {
      data.append("upload", img);
    });

    const res = await ApiService.post("/restaurant/register", data);

    return res;
  }, [merchantInfo, operatingHours]);

  const stepContent = [
    generateStepContent(
      "Basic Information",
      "Tell us more about your restaurant!",
      <BasicInfoFields
        merchantInfo={merchantInfo}
        setMerchantInfo={setMerchantInfo}
        setVerifier={setVerifier}
      />
    ),
    generateStepContent(
      "Opening Hours",
      "Your customers hate bad surprises! Let them know when they can visit",
      <OpeningHours
        operatingHours={operatingHours}
        setOperatingHours={setOperatingHours}
        setVerifier={setVerifier}
      />
    ),
    generateStepContent(
      "Upload Photos",
      "Show your customers how good your place looks",
      <UploadPhotos
        imageArr={imageArr}
        setImageArr={setImageArr}
        rawImgArr={rawImgArr}
        setRawImgArr={setRawImgArr}
        width={width}
      />
    ),
    generateStepContent(
      "Review",
      "Make sure everything is correct!",
      <Review merchantInfo={merchantInfo} operatingHours={operatingHours} />
    ),
  ];

  return (
    <>
      <DesktopStepper
        stepContent={stepContent}
        width={width}
        verifier={verifier}
        submit={submitForm}
      />
    </>
  );
}
