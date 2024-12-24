import React, { useState } from "react";
import {ThemeProvider,createTheme } from '@mui/material'
import {
  Avatar,
  Button,
  Card,
  CardContent,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock"; // Optional, for button icon

const customTheme = createTheme({
  palette: {
    primary: {
      main: '#fa9a34',
    },
  },
  components: {
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '& fieldset': {
            border:"2px solid lightgray",
          },
          '&:hover fieldset': {
            borderColor: '#fa9a34', // Border on hover
          },
          '&.Mui-focused fieldset': {
            borderColor: '#fa9a34', // Border on focus
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#fa9a34', // Default border color for Select
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#fa9a34',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#fa9a34',
          },
        },
        icon: {
          color: '#fa9a34', // Icon color
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#fa9a34',
            color: 'white',
          },
          '&.Mui-selected': {
            backgroundColor: '#fa9a34',
            color: 'white',
          },
        },
      },
    },
  },
});
const ProfileBanner = () => {
  const [open, setOpen] = useState(false); // State to control the modal
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOldPassword(""); // Reset old password field
    setNewPassword(""); // Reset new password field
  };

  const handleUpdatePassword = () => {
    // Add your password update logic here
    console.log("Old Password:", oldPassword);
    console.log("New Password:", newPassword);
    handleClose(); // Close modal after updating
  };

  return (
    <Card
      sx={{
        position: "relative",
        backgroundColor: "white", // Background color
        color: "#fa9a34",
        height: { xs: "auto", md: "200px" }, // Adjust height based on screen size
        width: "100%",
        padding: { xs: "5px 10px", md: "10px 20px" }, // Responsive padding
        display: "flex",
        flexDirection: "column",
        justifyContent: "center", // Center content vertically
        alignItems: "center", // Center content horizontally
        marginBottom: "20px",
        overflow: "visible",
      }}
    >
      <CardContent sx={{ textAlign: "center", paddingBottom: { xs: "50px", md: "20px" } }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            fontFamily: '"Playpen Sans", cursive',
            fontSize: { xs: "20px", md: "50px" }, // Responsive font size
          }}
        >
          HHO
        </Typography>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            fontFamily: '"Playpen Sans", cursive',
            fontSize: { xs: "15px", md: "30px" }, // Responsive font size
            marginBottom: { xs: "20px", md: "0px" }, // Add margin bottom for mobile
          }} 
        >
          Welcome {"Core"}
        </Typography>
      </CardContent>

      

      {/* Change Password Button positioned at the bottom right */}
      {/* <Button
        variant="contained"
        sx={{
          backgroundColor: "#fa9a34", // Set the button background color
          position: "absolute",
          bottom: 10, // Adjusted for bottom spacing
          right: 10, // Position to the right
          padding: { xs: "5px 10px", md: "10px 20px" }, // Responsive padding for button
          fontSize: { xs: "12px", md: "16px" },
          fontWeight: "bolder", // Responsive font size for button text
          "&:focus": {
            outline: "none", // No outline on focus
          },
          "&:active": {
            border: "none", // No border when clicked
            outline: "none",
            boxShadow: "none", // Remove any shadow
          },
        }}
        startIcon={<LockIcon />}
        onClick={handleClickOpen} // Open modal on button click
      >
        Change Password
      </Button> */}

      {/* Modal for Change Password */}
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            backgroundColor: "#ffffff", // Light orange background for the dialog
            color: "#fa9a34", // Black text color
          },
        }}
      >
        <DialogTitle><b>Change Password</b></DialogTitle>
        <DialogContent>
        <ThemeProvider theme={customTheme}>
          <TextField
            margin="dense"
            label="Old Password"
            type="password"
            fullWidth
            variant="outlined"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
            InputProps={{
              sx: { color: "#fa9a34" }, // Set text color to black
            }}
            
          />
          <TextField
            margin="dense"
            label="New Password"
            type="password"
            fullWidth
            variant="outlined"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            InputProps={{
              sx: { color: "#fa9a34" }, // Set text color to black
            }}
            
         
          />
           </ThemeProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="#fa9a34">
            <b>Cancel</b>
          </Button>
          <Button onClick={handleUpdatePassword} color="#fa9a34">
            <b>Update Password</b>
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ProfileBanner;
