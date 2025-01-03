import React, { useState, useContext } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AppContext } from "../../../context/Context";
import axios from "axios";

const theme = createTheme({
  palette: {
    primary: {
      main: "#FF5722", // Orange color
    },
    text: {
      primary: "#000000", // Black text
    },
    background: {
      default: "#FFFFFF", // White background
    },
  },
});

function NewDonation() {
  const{token,apiUrl} = useContext(AppContext);
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    description: "",
    date: new Date().toISOString().split("T")[0],
    amount: "",
    photo: null,
  });
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { setAlertMsg, setOpen, setErrorOcc } = useContext(AppContext);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFormData((prev) => ({ ...prev, photo: selectedFile }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const uploadImageToCloudinary = async () => {
    const uploadData = new FormData();
    uploadData.append("file", formData.photo);
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

  const handleSubmit = async () => {
    const { name, title, description, date, amount, photo } = formData;
    if (!name || !title || !description || !date || !amount || !photo) {
      setAlertMsg("Please fill all the fields and upload an image.");
      setErrorOcc(true);
      setOpen(true);
      return;
    }

    setLoading(true);
    const uploadedImageUrl = await uploadImageToCloudinary();

    setTimeout(async () => {
      setLoading(false);
      if (uploadedImageUrl) {
        const finalFormData = {
          name:formData.name,
          title:formData.title,
          description:formData.description,
          date:formData.date,
          amt:formData.amount,
          photo:uploadedImageUrl
        }
        console.log("Form Data:", finalFormData);
        console.log("hi prasad");

        const headers = {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        };
        await axios
          .post(
            `${apiUrl}:8000/api/donations/create`,
            finalFormData,
            { headers }
          )
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              setAlertMsg("Donation Added Successfully...");
              setErrorOcc(false);
              setOpen(true);
              setFormData({
                name: "",
                title: "",
                description: "",
                date: new Date().toISOString().split("T")[0],
                amount: "",
                photo: null,
              });
            }
          })
          .catch((e) =>
             {  
              console.log("hiiii")
              console.log(e)});
      } else {
        console.error("Failed to upload image.");
      }
    }, 3000);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          py: 4,
          px: 2,
          maxWidth: "800px",
          backgroundColor: "#FFFFFF",
          borderRadius: 3,
          boxShadow: 2,
          border: "1px solid #FF5722",
          margin: "20px auto",
          width:isMobile?'95%':"800px"
        }}
      >
        <Typography
          variant="h5"
          sx={{
            color: "#FF5722",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          New Donation
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            gap: 3,
            alignItems: "flex-start",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              flex: 2,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: 2,
              }}
            >
              <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                fullWidth
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root fieldset": {
                    borderColor: "#FF5722",
                  },
                }}
              />
              <TextField
                label="Title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                fullWidth
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root fieldset": {
                    borderColor: "#FF5722",
                  },
                }}
              />
            </Box>
            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              fullWidth
              multiline
              rows={3}
              sx={{
                "& .MuiOutlinedInput-root fieldset": {
                  borderColor: "#FF5722",
                },
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: isMobile ? "column" : "row",
                gap: 2,
              }}
            >
              <TextField
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root fieldset": {
                    borderColor: "#FF5722",
                  },
                }}
              />
              <TextField
                label="Amount"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CurrencyRupeeIcon sx={{ color: "#FF5722" }} />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  flex: 1,
                  "& .MuiOutlinedInput-root fieldset": {
                    borderColor: "#FF5722",
                  },
                }}
              />
            </Box>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flex: 1,
              gap: 2,
            }}
          >
            <Button
              variant="contained"
              component="label"
              sx={{
                backgroundColor: "#FF5722",
                color: "#FFFFFF",
                "&:hover": {
                  backgroundColor: "#E64A19",
                },
                width: "100%",
              }}
            >
              Upload Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleFileChange}
              />
            </Button>
            {!formData.photo ? (
              <Typography
                sx={{
                  color: "#757575",
                  textAlign: "center",
                  fontStyle: "italic",
                }}
              >
                Preview of the photo
              </Typography>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  border: "1px solid #FF5722",
                  borderRadius: 2,
                  width: "100%",
                  height: "200px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={URL.createObjectURL(formData.photo)}
                  alt="Preview"
                  style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
              </Box>
            )}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            mt: 3,
          }}
        >
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#FF5722",
              color: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#E64A19",
              },
              padding: "12px 60px",
              borderRadius: 3,
              fontWeight: "bold",
            }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} sx={{ color: "#FFFFFF" }} /> : "Submit"}
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default NewDonation;
