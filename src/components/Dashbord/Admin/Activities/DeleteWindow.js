import React, { useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Button,
} from "@mui/material";
import axios from "axios";
import { AppContext } from "../../../../context/Context";
const DeleteConfirmationDialog = ({ handleClose, activity }) => {
  const {setAlertMsg,setOpen,token,setErrorOcc,apiUrl} = useContext(AppContext);
  return (
    <Dialog
      open={true}
      onClose={() => {
        handleClose("delete");
      }}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description">
      <DialogTitle id="alert-dialog-title">Delete Confirmation</DialogTitle>
      <DialogContent>
        <Typography id="alert-dialog-description">
          Are you sure you want to delete this item?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleClose("delete")} color="primary">
          Cancel
        </Button>
        <Button
          onClick={async() => {

            const headers = {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            };

           await axios
              .delete(
                `${apiUrl}/api/activities/delete/${activity._id}`,{headers}
              )
              .then((res) => {
                if(res.status === 200){
                setAlertMsg("Activity Deleted..");
                setOpen(true);
                setErrorOcc(false);
                handleClose("delete");
                }
              })
              .catch((e) => {console.log(e)
                setAlertMsg(e.message);
                setErrorOcc(true);
                setOpen(true);
              });
          }}
          color="error"
          autoFocus>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteConfirmationDialog;
