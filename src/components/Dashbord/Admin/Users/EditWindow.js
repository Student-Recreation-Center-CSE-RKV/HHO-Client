import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  Avatar,
  Box,
} from "@mui/material";
import { AppContext } from "../../../../context/Context";
import { useContext } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import LoadingAnimation from "../../../../components/LoadingAnimation";

import CloudUploadIcon from "@mui/icons-material/CloudUpload";
const EditUserDialog = ({ onClose, user }) => {
  const {setAlertMsg,setOpen,setErrorOcc,token,apiUrl} = useContext(AppContext);
  const [btnText, setBtnText] = useState("Save");

  const [formData, setFormData] = useState({
    image: user.image || "",
    name: user.name || "",
    email: user.email || "",
    password: user.password || "",
    role: user.role || "",
    ID: user.ID || "",
    mobile: user.mobile || "",
    linkedin: user.linkedin || "",
  });
  const [imageFile,setImageFile] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = async () => {
    let imageUrl = formData.image;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    };
    setBtnText(<LoadingAnimation size={23}/>)
    if (imageFile instanceof File) {
      const uploadData = new FormData();
      uploadData.append("file", imageFile);
      uploadData.append("upload_preset", "unsigned_upload");
  
      try {
        const response = await axios.post(
          "https://api.cloudinary.com/v1_1/dkzzeiqhh/image/upload",
          uploadData
        );
        imageUrl = response.data.secure_url;
      } catch (e) {
        console.error("Image upload failed:", e);
      }
    }
  
    const updatedData = {
      ...formData,
      image: imageUrl,
    };
  
    try {
      const response = await axios.put(
        `${apiUrl}/api/users/offUsers/updateUsers/${user._id}`,
        updatedData,{headers}
      );
      console.log(response.data);
        setAlertMsg("Updated Successfully");
        setOpen(true);
        setErrorOcc(false);
        onClose("edit");
      
      setBtnText("Save");
    } catch (e) {
      console.error("User update failed:", e);
      setAlertMsg(e.message);
      setOpen(true);
      setErrorOcc(true);
      onClose("edit");
      setBtnText("Save");
    } 
  };
  

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result });
      };
      reader.readAsDataURL(file);
      console.log(formData);
    }
  };

  const handleSubmit = async () => {
    await onSubmit();
    onClose("edit");
  };

  return (
    <Dialog open={true} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        Edit User
        <IconButton
          onClick={onClose}
          style={{ position: "absolute", right: 8, top: 8 }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
          <Avatar src={formData.image} sx={{ width: 80, height: 80, mb: 2 }} />
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="upload-button"
            type="file"
            onChange={handleImageUpload}
          />
          <label htmlFor="upload-button">
            <Button
              component="span"
              startIcon={<CloudUploadIcon />}
              variant="outlined">
              Upload Image
            </Button>
          </label>
        </Box>
        <TextField
          margin="dense"
          name="name"
          label="Name"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.name}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="email"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={formData.email}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="password"
          label="Password"
          type="password"
          fullWidth
          variant="outlined"
          value={formData.password}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="role"
          label="Role"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.role}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="ID"
          label="ID"
          type="text"
          fullWidth
          variant="outlined"
          value={formData.ID}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="mobile"
          label="Mobile"
          type="tel"
          fullWidth
          variant="outlined"
          value={formData.mobile}
          onChange={handleChange}
        />
        <TextField
          margin="dense"
          name="linkedin"
          label="LinkedIn"
          type="url"
          fullWidth
          variant="outlined"
          value={formData.linkedin}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={()=>{
          onClose("edit");
        }} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSubmit} color="primary" disabled={btnText === "Save" ? false : true}>
          {btnText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUserDialog;
