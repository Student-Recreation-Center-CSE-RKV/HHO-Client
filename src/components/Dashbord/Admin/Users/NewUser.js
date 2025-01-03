import React, { useState, useContext } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Avatar,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { AppContext } from "../../../../context/Context";

import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import LoadingAnimation from "../../../LoadingAnimation";
const NewUser = () => {
  const { setAlertMsg, setOpen, token, setErrorOcc,apiUrl } = useContext(AppContext);
  const [btnText, setBtnText] = useState("SUBMIT");
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    email: "",
    password: "",
    role: "",
    ID: "",
    mobile: "",
    linkedin: "",
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [isOtherRole, setIsOtherRole] = useState(false);
  const [imageFile,setImageFile] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRoleChange = (e) => {
    const value = e.target.value;
    setFormData((prevData) => ({ ...prevData, role: value }));
    setIsOtherRole(value === "Other");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };
  const uploadImageToCloudinary = async () => {
    const uploadData = new FormData();
    uploadData.append("file", imageFile);
    uploadData.append("upload_preset", "unsigned_upload");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dkzzeiqhh/image/upload",
        uploadData
      );
      return response.data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (imageFile instanceof File) {
      setBtnText(<LoadingAnimation size={25}/>);
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const imageUrl = await uploadImageToCloudinary();
      console.log(imageUrl);
      if(imageUrl ) {
        console.log(imageUrl);

        console.log(formData);
        axios
          .post(`${apiUrl}/api/users/offUsers/newUser`, {...formData,image:imageUrl}, {
            headers,
          })
          .then((res) => {
            setFormData({
              image: null,
              name: "",
              email: "",
              password: "",
              role: "",
              ID: "",
              mobile: "",
              linkedin: "",
            });
            setImagePreview(null);
            setAlertMsg("New user added...");
            setErrorOcc(false);
            setOpen(true);
            setBtnText("SUBMIT");
          })
          .catch((e) => {
            console.log(e);
            setAlertMsg(e.response.data.message);
            setErrorOcc(true);
            setOpen(true);
            setBtnText("SUBMIT");
          });
      }
    } else {
      setAlertMsg("Upload an image..");
      setErrorOcc(true);
      setOpen(true);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        maxWidth: 400,
        margin: "auto",
        p: 2,
        boxShadow: 3,
        borderRadius: 2,
        width: { xs: "80vw", sm: "70vw", md: "70vw" },
      }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{ mb: 2, textAlign: "center" }}>
        New User
      </Typography>

      {/* Image Preview */}
      {imagePreview && (
        <Avatar
          src={imagePreview}
          alt="Profile Preview"
          sx={{
            width: 100,
            height: 100,
            mb: 2,
            mx: "auto",
          }}
        />
      )}

      {/* Image Upload */}
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <Button
          variant="contained"
          component="label"
          startIcon={<PhotoCamera />}
          sx={{ mr: 2 }}>
          Upload Image
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageChange}
          />
        </Button>
      </Box>

      <TextField
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />

      <TextField
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />

      <TextField
        label="Password"
        name="password"
        type="password"
        value={formData.password}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />

      {/* Role Radio Group */}
      <Typography variant="body1" sx={{ mb: 1 }}>
        Role
      </Typography>
      <RadioGroup
        value={formData.role}
        onChange={handleRoleChange}
        row
        sx={{ mb: 2 }}>
        <FormControlLabel value="Core" control={<Radio />} label="Core" />
        <FormControlLabel
          value="Accountant"
          control={<Radio />}
          label="Accountant"
        />
        <FormControlLabel value="Other" control={<Radio />} label="Other" />
      </RadioGroup>

      {isOtherRole && (
        <TextField
          label="Specify Role"
          name="role"
          value={formData.role}
          onChange={handleChange}
          fullWidth
          required
          sx={{ mb: 2 }}
        />
      )}

      <TextField
        label="ID"
        name="ID"
        value={formData.ID}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />

      <TextField
        label="Mobile"
        name="mobile"
        type="tel"
        value={formData.mobile}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 2 }}
      />

      <TextField
        label="LinkedIn"
        name="linkedin"
        type="url"
        value={formData.linkedin}
        onChange={handleChange}
        fullWidth
        required
        sx={{ mb: 3 }}
      />

      <Button
        variant="contained"
        color="primary"
        type="submit"
        fullWidth
        disabled={btnText === "SUBMIT" ? false : true}>
        {btnText}
      </Button>
    </Box>
  );
};

export default NewUser;
