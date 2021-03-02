import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";
import React from "react";

const AlertDialog = ({ notified, setNotified, restaurantName }) => {
  const closeHandler = () => setNotified(false);

  const cancelHandler = async () => {};

  return (
    <Dialog open={notified} onClose={closeHandler}>
      <DialogTitle>It's your turn!</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Your queue number for {restaurantName} has reached. Please be there in
          5 minutes, else your number will be forfeited. See you!
        </DialogContentText>
        <DialogActions>
          <Button onClick={closeHandler}> Okay, I'm on my way!</Button>
          <Button onClick={cancelHandler}> Cancel queue</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default AlertDialog;
