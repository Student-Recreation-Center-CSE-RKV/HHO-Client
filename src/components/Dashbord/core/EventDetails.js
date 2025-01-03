import React, { useState,useContext } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  IconButton,
} from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import EventIcon from '@mui/icons-material/Event'; // For event date icon
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import {AppContext} from '../../../context/Context';
function EventDetails() {
  const{setAlertMsg,setErrorOcc,setOpen,apiUrl} = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const { event } = location.state || {};

  const [openDialog, setOpenDialog] = useState(false);
  const [currentSubEvent, setCurrentSubEvent] = useState(null);
  const [editedEvent, setEditedEvent] = useState(event || {});
  const [newDialog, setNewDialog] = useState(false);
  const [newSubEvent, setNewSubEvent] = useState({
    subEventTitle: '',
    subEventDescription: '',
    subEventDate: '',
    subEventVenue: '',
    subEventPoster: '',
  });
  const [selectedFileName, setSelectedFileName] = useState('');

  if (!event) {
    return <div>No event details available.</div>;
  }

  const handleNewDialog = (subEvent = null) => {
    setCurrentSubEvent(subEvent);
    setNewDialog(true);
  };

  const handleCloseNewDialog = () => {
    setNewDialog(false);
    setCurrentSubEvent(null);
  };

  const handleOpenDialog = (subEvent = null) => {
    setCurrentSubEvent(subEvent);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentSubEvent(null);
  };

  const uploadImageToCloudinary = async (photoUrl) => {
    const uploadData = new FormData();
    uploadData.append('file', photoUrl);
    uploadData.append('upload_preset', 'unsigned_upload');

    try {
      const response = await axios.post(
        'https://api.cloudinary.com/v1_1/dkzzeiqhh/image/upload',
        uploadData
      );
      setAlertMsg("Image is uploaded successfully");
      setErrorOcc(false);
      setOpen(true);
      return response.data.secure_url;
    } catch (error) {
      console.error('Image upload failed:', error);
      return null;
    }
  };

  const handleChange = async (e) => {
    const { name, value, files } = e.target;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFileName(file.name);
      const uploadedUrl = await uploadImageToCloudinary(files[0]);
      if (newDialog) {
        setNewSubEvent((prev) => ({ ...prev, [name]: uploadedUrl }));
      } else if (currentSubEvent) {
        setCurrentSubEvent((prev) => ({ ...prev, [name]: uploadedUrl }));
      } else {
        console.log(uploadedUrl);
        setEditedEvent((prev) => ({ ...prev, [name]: uploadedUrl }));
      }
    } else {
      if (newDialog) {
        setNewSubEvent((prev) => ({ ...prev, [name]: value }));
      } else if (currentSubEvent) {
        setCurrentSubEvent((prev) => ({ ...prev, [name]: value }));
      } else {
        setEditedEvent((prev) => ({ ...prev, [name]: value }));
      }
    }
  };

  const handleSubmit = async () => {
    
    try {
      if (newDialog) {
        const updatedSubEvents = [
          ...editedEvent.subEvents,
          { ...newSubEvent },
        ];

        await axios.put(
          `${apiUrl}/api/events/editEvent/${editedEvent._id}`,
          {
            ...editedEvent,
            subEvents: updatedSubEvents,
          }
        );

        console.log(updatedSubEvents);

        setEditedEvent((prev) => ({ ...prev, subEvents: updatedSubEvents }));
        setNewSubEvent({
          subEventTitle: '',
          subEventDescription: '',
          subEventDate: '',
          subEventVenue: '',
          subEventPoster: '',
        });
        setAlertMsg('Sub-Event Added Successfully');
        setErrorOcc(false);
        setOpen(true);
      } else if (currentSubEvent) {
        const updatedSubEvents = editedEvent.subEvents.map((subEvent) =>
          subEvent._id === currentSubEvent._id ? currentSubEvent : subEvent
        );

        await axios.put(
          `${apiUrl}/api/events/editEvent/${editedEvent._id}`,
          {
            ...editedEvent,
            subEvents: updatedSubEvents,
          }
        );

        setEditedEvent((prev) => ({ ...prev, subEvents: updatedSubEvents }));
        setAlertMsg('Sub-Event Updated Successfully');
        setErrorOcc(false);
        setOpen(true);
      } else {
        console.log(editedEvent);
        await axios.put(
          `${apiUrl}/api/events/editEvent/${editedEvent._id}`,
          editedEvent
        );
        setAlertMsg('Event Updated Successfully');
        setErrorOcc(false);
        setOpen(true);
      }

      handleCloseDialog();
      handleCloseNewDialog();
    } catch (error) {
      console.error('Error updating event:', error);
    }
  };

  const handleDeleteEvent = async () => {
    try {
      await axios.delete(
        `${apiUrl}/api/events/deleteEvent/${event._id}`
      );
      navigate('/dashboard/events');
      setAlertMsg('Event deleted  Successfully');
      setErrorOcc(true);
      setOpen(true);

    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleDeleteSubEvent = async (subEvent) => {
    try {
      const updatedSubEvents = editedEvent.subEvents.filter(
        (se) => se._id !== subEvent._id
      );
      await axios.put(
        `${apiUrl}/api/events/editEvent/${event._id}`,
        {
          ...editedEvent,
          subEvents: updatedSubEvents,
        }
      );
      setEditedEvent((prev) => ({ ...prev, subEvents: updatedSubEvents }));
      setAlertMsg('Sub-Event deleted  Successfully');
      setErrorOcc(true);
      setOpen(true);
    } catch (error) {
      console.error('Error deleting subevent:', error);
    }
  };

  return (
    <div>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        <Grid item xs={12} md={5} lg={6}>
          <Card style={{ width: '100%', height: 'auto', borderRadius: '24px' }}>
            <CardMedia
              component="img"
              image={editedEvent.eventPoster}
              alt={editedEvent.eventTitle}
              style={{ borderRadius: '24px' }}
            />
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <Typography variant="h3" gutterBottom>
            {editedEvent.eventTitle}
          </Typography>
          <Typography variant="h6" color="textSecondary" paragraph>
            {editedEvent.eventDescription}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            <EventIcon style={{ verticalAlign: 'middle', marginRight: 8 }} />
            {editedEvent.event_start_date.split('T')[0]} to {editedEvent.event_end_date.split('T')[0]}
          </Typography>
          <Typography variant="body1" color="textSecondary" paragraph>
            <LocationOnIcon style={{ verticalAlign: 'middle', marginRight: 8 }} />
            {editedEvent.eventVenue}
          </Typography>
          <div>
            <IconButton color="primary" onClick={() => handleOpenDialog()}>
              <EditIcon />
            </IconButton>
            <IconButton
              color="secondary"
              onClick={handleDeleteEvent}
              style={{ marginLeft: '10px' }}
            >
              <DeleteIcon />
            </IconButton>
          </div>
        </Grid>
      </Grid>

      <Typography variant="h4" gutterBottom style={{ marginTop: '30px' }}>
        Subevents
      </Typography>
      <Tooltip title="Add New Subevent" placement="top" arrow>
      <IconButton
        color="primary"
        onClick={() => handleNewDialog()}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          boxShadow: '0px 4px 10px rgba(0,0,0,0.2)',
          backgroundColor: 'orange',
          color: 'white',
        }}
      >
        <AddIcon/>
      </IconButton>
      </Tooltip>

      <Grid container spacing={3}>
      {editedEvent.subEvents.length === 0 ? (
        <Typography variant="h6" color="textSecondary" style={{marginLeft:'26px', marginTop:'8px'}}>
          No Subevents available
        </Typography>
      ) : (
      editedEvent.subEvents.map((subEvent, index) => (
        <Grid item xs={12} sm={6} md={4} key={index}>
          <Card style={{ borderRadius: '16px', height: '100%' }}>
            <CardMedia
              component="img"
              height="200"
              image={subEvent.subEventPoster}
              alt={subEvent.subEventTitle}
            />
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {subEvent.subEventTitle}
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                {subEvent.subEventDescription}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                <EventIcon style={{ verticalAlign: 'middle', marginRight: 8 }} />
                {subEvent.subEventDate.split('T')[0]}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                <LocationOnIcon style={{ verticalAlign: 'middle', marginRight: 8 }} />
                {subEvent.subEventVenue}
              </Typography>
              <div>
                <IconButton
                  color="primary"
                  onClick={() => handleOpenDialog(subEvent)}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  color="secondary"
                  onClick={() => handleDeleteSubEvent(subEvent)}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            </CardContent>
          </Card>
        </Grid>
      )))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {currentSubEvent ? 'Edit Subevent' : 'Edit Event'}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name={currentSubEvent ? 'subEventTitle' : 'eventTitle'}
            value={
              currentSubEvent
                ? currentSubEvent.subEventTitle
                : editedEvent.eventTitle
            }
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Description"
            name={currentSubEvent ? 'subEventDescription' : 'eventDescription'}
            value={
              currentSubEvent
                ? currentSubEvent.subEventDescription
                : editedEvent.eventDescription
            }
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Date"
            name={currentSubEvent ? 'subEventDate' : 'event_start_date'}
            value={
              currentSubEvent
                ? currentSubEvent.subEventDate.split('T')[0]
                : editedEvent.event_start_date.split('T')[0]
            }
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Venue"
            name={currentSubEvent ? 'subEventVenue' : 'eventVenue'}
            value={
              currentSubEvent
                ? currentSubEvent.subEventVenue
                : editedEvent.eventVenue
            }
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <Button variant="contained" component="label">
            Upload Poster
            <input
              type="file"
              name={currentSubEvent ? 'subEventPoster' : 'eventPoster'}
              accept="image/*"
              onChange={handleChange}
              hidden
              required
            />
          </Button>
          {selectedFileName && (
            <Typography variant="body2" style={{ marginTop: '10px' }}>
              Selected File: {selectedFileName}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={newDialog} onClose={handleCloseNewDialog}>
        <DialogTitle>Add Subevent</DialogTitle>
        <DialogContent>
          <TextField
            label="Title"
            name="subEventTitle"
            value={newSubEvent.subEventTitle}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Description"
            name="subEventDescription"
            value={newSubEvent.subEventDescription}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Date"
            name="subEventDate"
            value={newSubEvent.subEventDate.split("T")[0]}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <TextField
            label="Venue"
            name="subEventVenue"
            value={newSubEvent.subEventVenue}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <Button variant="contained" component="label">
            Upload Poster
            <input
              type="file"
              name="subEventPoster"
              accept="image/*"
              onChange={handleChange}
              hidden
              required
            />
          </Button>
          {selectedFileName && (
            <Typography variant="body2" style={{ marginTop: '10px' }}>
              Selected File: {selectedFileName}
            </Typography>
          )}
          <Typography variant="body2" style={{marginTop:'8px'}}> Note: Wait until image is uploaded</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNewDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default EventDetails;
