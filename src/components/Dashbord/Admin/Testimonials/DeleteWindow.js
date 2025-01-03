import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { AppContext } from "../../../../context/Context";
import { useContext } from "react";
import axios from "axios";

const DeleteWindow = ({ testimonial, handleClose }) => {
  const { setOpen, setAlertMsg,setErrorOcc,token,apiUrl } = useContext(AppContext);

  const handleConfirm = async() => {

    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
   await  axios
      .delete(
        `${apiUrl}/api/testimonials/deleteTestimonial/${testimonial._id}`,
        {headers}
      )
      .then((res) => {
        setAlertMsg("Testimonial deleted...");
        setOpen(true);
        handleClose("delete");
      })
      .catch((e) => {console.log(e);
        setAlertMsg(e.message);
        setErrorOcc(true);
        setOpen(true);
        handleClose("delete");
      });
  };
  return (
    <Dialog open={true} onClose={handleClose} maxWidth="xs" fullWidth>
      <DialogTitle>Confirm Deletion</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Do you want to delete this testimonial?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleConfirm} color="error" variant="contained">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteWindow;
