import React, { useState, useEffect,useContext } from "react";
import axios from "axios";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@mui/material";
import EditWindow from "./EditWindow";
import DeleteWindow from "./DeleteWindow";
import { AppContext } from "../../../../context/Context";
const AllActivities = () => {
  const { setAlertMsg, setOpen, setErrorOcc, token,apiUrl } = useContext(AppContext);
  const [activities, setActivities] = useState([]);
  const [selected, setSelected] = useState(null);
  const [editWindow, setEditWindow] = useState(false);
  const [deleteWindow, setDeleteWindow] = useState(false);

  const fetchActivities = async () => {
    try {
      const res = await axios.get(`${apiUrl}/api/activities/getAll`);
      setActivities(res.data.data);
    } catch (error) {
      console.log("Error fetching activities:", error);
      setAlertMsg(error.message);
      setErrorOcc(true);
      setOpen(true);
    }
  };

  const handleClose = async (type) => {
    type === "edit" ? setEditWindow(false) : setDeleteWindow(false);
    await fetchActivities();
  };

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <div>
      <h2>All Activities</h2>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {activities.map((activity) => (
          <Card
            key={activity._id} 
            sx={{
              maxWidth: 800,
              mx: "auto",
              boxShadow: 3,
              borderRadius: 2,
              width: { xs: "70vw", sm: "50vw", md: "25vw" }
            }}
            style={{marginBottom:"4vh" }}
          >
            <CardMedia
              component="img"
              height="140"
              width="340"
              image={activity.image}
              alt={activity.name}
              sx={{ objectFit: "cover" }}
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {activity.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {activity.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: "space-between" }}>
              <Button
                size="small"
                color="primary"
                onClick={() => {
                  setSelected(activity);
                  setEditWindow(true);
                }}
              >
                Edit
              </Button>
              <Button
                size="small"
                color="error"
                onClick={() => {
                  setSelected(activity);
                  setDeleteWindow(true);
                }}
              >
                Delete
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
      {editWindow && <EditWindow activity={selected} handleClose={handleClose} />}
      {deleteWindow && <DeleteWindow activity={selected} handleClose={handleClose} />}
    </div>
  );
};

export default AllActivities;
