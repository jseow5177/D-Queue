import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createSocket } from "../../../sockets/sockets";
import ApiService from "../../services/api.service";

const QueueDialog = ({ dialog, setDialog, user, restaurantDetail }) => {
  let history = useHistory();

  const [pax, setPax] = useState(1);
  const [contact, setContact] = useState("");

  const closeHandler = () => setDialog(false);
  const contactHandler = (e) => setContact(e.target.value);
  const paxHandler = (e) => setPax(e.target.value);

  const queueHandler = async () => {
    const payload = {
      userID: user._id,
      restaurantID: restaurantDetail._id,
      pax: pax,
    };

    try {
      const socket = createSocket(restaurantDetail._id);

      console.log("Created restaurant socket");

      let res = await ApiService.post("/user/enterQueue", payload);
    } catch (error) {
      console.log(error.message);
    }

    history.push(`/user/queueList/${user._id}`);
  };

  return (
    <Dialog open={dialog} onClose={closeHandler}>
      <DialogTitle>Please enter your details</DialogTitle>
      <DialogContent>
        <FormControl>
          <TextField select label="Pax" value={pax} onChange={paxHandler}>
            {Array.from(Array(11), (_, index) => {
              return <MenuItem value={index}>{index}</MenuItem>;
            })}
          </TextField>

          <TextField
            id="standard-basic"
            label="Contact No"
            value={contact}
            onChange={contactHandler}
          />
        </FormControl>
        <DialogActions>
          <Button onClick={closeHandler}> Cancel </Button>
          <Button onClick={queueHandler}>Queue Now</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default QueueDialog;
