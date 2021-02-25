import React from "react";
import { useSelector } from "react-redux";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";

import { cancelQueue } from "../../../actions/queueActions";

export default function AlertDialog(props) {
    const { queue } = useSelector((state) => state);
    const [open, setOpen] = React.useState(true);

    const handleClose = (event) => () => {

        if (event === "acknowledge")
        {
            cancelQueue();
            console.log("Acknowledged");
        }

        //Cancel queue number
        else if (event === "cancel")
            console.log("Cancel queue number");

        setOpen(false);
    }
    
    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>
                    Queue Reached
                </DialogTitle>
                <DialogContent>
                    Your turn has reached for restaurant {queue.restaurantID}. If you do not reach within 10 minutes your place will be forfeited
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose("acknowledge")} color="primary">
                        OK, I am on my way
                    </Button>
                    <Button onClick={handleClose("cancel")} color="primary">
                        Cancel queue
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}