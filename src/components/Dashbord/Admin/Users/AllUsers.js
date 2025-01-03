import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import EditWindow from "./EditWindow.js";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import DeleteWindow from "./DeleteWindow.js";
import {
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from "@mui/material";
import { AppContext } from "../../../../context/Context.js";
const AllUsers = () => {
  const [users, setUsers] = useState();
  const [deleteWindow, setDeleteWindow] = useState(false);
  const { token ,apiUrl} = useContext(AppContext);
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  const getUserData = async () => {
    try {
      await axios
        .get(`${apiUrl}/api/users/offUsers/`, { headers })
        .then((res) => {
          setUsers(res.data);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  const [editWindow, setEditWindow] = useState(false);
  const [selected, setSelected] = useState();
  const handleClose = (type) => {
    type === "edit" ? setEditWindow(false) : setDeleteWindow(false);
    setSelected(null);
    getUserData();
  };

  return (
    <div>
      <h3>All Users</h3>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {users &&
          users.map((user) => {
            const { image, name, role, email, mobile, linkedin, ID } = user;
            return (
              <Card
              
              sx={{  margin: "auto", boxShadow: 3,width: { xs: "80vw", sm: "25vw", md: "25vw" }, }}
                style={{  marginBottom: "2vh" }}>
                <CardMedia
                  component="img"
                  alt="Profile Picture"
                  height="140"
                  image={image}
                  sx={{ objectFit: "cover" }}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Email:</strong> {email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Role:</strong> {role}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>ID:</strong> {ID}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Mobile:</strong> {mobile}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                    <LinkedInIcon
                      fontSize="small"
                      color="primary"
                      sx={{ mr: 0.5 }}
                    />
                    <Typography variant="body2">
                      <a
                        href={linkedin}
                        target="_blank"
                        rel="noopener noreferrer">
                        LinkedIn Profile
                      </a>
                    </Typography>
                  </Box>
                </CardContent>
                <CardActions
                  style={{ display: "flex", justifyContent: "space-between" }}>
                  <IconButton
                    aria-label="edit"
                    style={{ border: "1px solid blue" }}
                    onClick={() => {
                      setSelected(user);
                      setEditWindow(true);
                    }}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton
                    aria-label="delete"
                    style={{ border: "1px solid red" }}
                    onClick={() => {
                      setSelected(user);
                      setDeleteWindow(true);
                    }}>
                    <DeleteIcon color="error" />
                  </IconButton>
                </CardActions>
              </Card>
            );
          })}
      </div>
      {editWindow && <EditWindow user={selected} onClose={handleClose} />}
      {deleteWindow && <DeleteWindow user={selected} onClose={handleClose} />}
    </div>
  );
};

export default AllUsers;
