import React, { useContext, useState } from "react";
import { TextField, Button, Box, Typography, Rating } from "@mui/material";
import axios from "axios";
import LoadingAnimation from "../../../../components/LoadingAnimation";
import { AppContext } from "../../../../context/Context";
function NewTestimonial() {
  const { setAlertMsg, setOpen, setErrorOcc, token,apiUrl } = useContext(AppContext);
  const [name, setName] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [addBtnContent, setAddBtnContent] = useState("Add");
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (rating == 0) {
      setAlertMsg("All fields are mandatory");
      setOpen(true);
      setErrorOcc(true);
    } else {
      setAddBtnContent(<LoadingAnimation color="white" size={25} />);
      const formData = {
        name,
        discipline,
        rating,
        message,
      };

      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      await axios
        .post(
          `${apiUrl}/api/testimonials/createTestimonial`,
          formData,
          { headers }
        )
        .then((res) => {
          setAddBtnContent("Add");
          setName("");
          setDiscipline("");
          setRating(0);
          setMessage("");
          setAlertMsg("New Testimonial Added...");

          setErrorOcc(false);
          setOpen(true);
        })
        .catch((err) => {
          console.log(err);
          setAlertMsg("Something went wrong...");
          setErrorOcc(true);
          setOpen(true);
          setAddBtnContent("Add");
        });
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        width: { sm: "30vw", xs: "90vw" },
        margin: "0 auto",
        padding: 3,
        border: "1px solid #ccc",
        borderRadius: 2,
      }}>
      <Typography variant="h5" textAlign="center">
        Add a new Testimonial
      </Typography>

      <TextField
        label="Name"
        variant="outlined"
        required
        fullWidth
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <TextField
        label="Discipline"
        variant="outlined"
        required
        fullWidth
        value={discipline}
        onChange={(e) => setDiscipline(e.target.value)}
      />

      <Box display="flex" alignItems="center" gap={1}>
        <Typography>Rating:</Typography>
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue || 0);
          }}
        />
      </Box>

      <TextField
        label="Message"
        variant="outlined"
        multiline
        rows={4}
        required
        fullWidth
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Button type="submit" variant="contained" color="primary">
        {addBtnContent}
      </Button>
    </Box>
  );
}

export default NewTestimonial;
