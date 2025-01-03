import React, { useRef, useState } from "react";
import { Box, TextField, Button, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { AppContext } from "../../../../context/Context";
import { useContext } from "react";
import LoadingAnimation from "../../../../components/LoadingAnimation";
const NewActivity = () => {
  const [btnText, setBtnText] = useState("Submit");
  const { setAlertMsg, setOpen, setErrorOcc, token,apiUrl } = useContext(AppContext);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
    if (formData.image === "") {
      setErrorOcc(true);
      setAlertMsg("Please upload image");
      setOpen(true);
    } else {
      console.log("Submitting");
      setBtnText(<LoadingAnimation size={25} color="white" />);
      const uploadedImageUrl = await uploadImageToCloudinary();

      if (uploadedImageUrl) {
        const finalFormData = {
          ...formData,
          image: uploadedImageUrl,
        };
        console.log("Form Data:", finalFormData);

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        await axios
          .post(
            `${apiUrl}/api/activities/create`,
            {
              name: finalFormData.title,
              description: finalFormData.description,
              image: finalFormData.image,
            },
            { headers }
          )
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              setAlertMsg("Activity Added...");
              setErrorOcc(false);
              setOpen(true);
              setFormData({
                title: "",
                description: "",
                image: "",
              });
              setBtnText("Submit");
            }
          })
          .catch((e) => console.log(e));
      } else {
        console.error("Failed to upload image.");
      }
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 600,
        mx: "auto",
        mt: 0,
        p: 3,
        boxShadow: 3,
        borderRadius: 2,
      }}>
      <Typography variant="h5" align="center" mb={2}>
        Create Post
      </Typography>

      <TextField
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        fullWidth
        required
        variant="outlined"
        margin="dense"
      />

      <TextField
        label="Description"
        name="description"
        value={formData.description}
        required
        onChange={handleChange}
        fullWidth
        variant="outlined"
        margin="dense"
        multiline
        rows={4}
      />

      <Box display="flex" flexDirection="column" alignItems="center" mb={2}>
        <img
          src={formData.image}
          style={{
            width: "5vw",
            height: "5vw",
            objectFit: "cover",
            borderRadius: "8px",
            marginBottom: "8px",
            marginTop: "1vh",
          }}
        />
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

      <Button type="submit" variant="contained" color="primary" fullWidth disabled={btnText === "Submit" ? false : true}>
        {btnText}
      </Button>
    </Box>
  );
};

export default NewActivity;
