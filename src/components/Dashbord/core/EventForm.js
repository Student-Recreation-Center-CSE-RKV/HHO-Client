import React, { useState,useEffect, useContext } from 'react';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { ConstructionOutlined, Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { AppContext } from '../../../context/Context';
import axios from 'axios';

function EventForm({subEventDetails,subEvents,setSubEventDetails,setSubEvents}) {

  const{setAlertMsg,setErrorOcc,setOpen,token,apiUrl} = useContext(AppContext);
  const [eventDetails, setEventDetails] = useState({
    eventTitle: '',
    eventDescription:  '',
    eventVenue: '',
    eventStartDate: '',
    eventEndDate: '',
    eventPoster: null,
  });

  
  
  const [isSubEventModalOpen, setIsSubEventModalOpen] = useState(false);
  const [hasSubEvent, setHasSubEvent] = useState(false);

  const isMainEventComplete = Object.values(eventDetails).every(
    (value) => value !== '' && value !== null
  );

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: files ? files[0] : value,
    }));
  };
  
  const handleUpdateSubEvent = (updatedEvent) => {
    setSubEvents((prev) =>
      prev.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  }; 

  const removePoster = () => {
    setEventDetails((prevDetails) => ({ ...prevDetails, eventPoster: null }));
  };

  const handleSubEventInputChange = (e) => {
    const { name, value, files } = e.target;
    setSubEventDetails((prevDetails) => ({
      ...prevDetails,
      [name]: files ? files[0] : value,
    }));
  };

  const removeSubEventPoster = () => {
    setSubEventDetails((prevDetails) => ({ ...prevDetails, subEventPoster: null }));
  };

  const openSubEventModal = () => setIsSubEventModalOpen(true);
  const closeSubEventModal = () => setIsSubEventModalOpen(false);
  const addSubEvent = () => {
    
    setSubEvents((prevSubEvents) => [...prevSubEvents, subEventDetails]);
    setSubEventDetails({
      subEventTitle: '',
      subEventDescription: '',
      subEventVenue: '',
      subEventDate: '',
      subEventPoster: null,
    });
    setHasSubEvent(true);
    closeSubEventModal();
  };


  const uploadImageToCloudinary = async (photoUrl) => {
    // console.log(eventDetails.eventPoster);
    const uploadData = new FormData();
    uploadData.append("file",photoUrl);
    uploadData.append("upload_preset", "unsigned_upload");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dkzzeiqhh/image/upload",
        uploadData
      );
      // setAlertMsg("Image uploaded sucessfully");
      // setErrorOcc(false);
      // setOpen(true);
      return response.data.secure_url;
    } catch (error) {
      console.error("Image upload failed:", error);
      return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Main Event Details:', eventDetails);
    console.log('Sub-events:', subEvents);

    // Perform form submission logic here
    try {
        // Perform form submission logic here
        const uploadedImageUrl = await uploadImageToCloudinary(eventDetails.eventPoster);
        // console.log("Main Event Poster:",uploadedImageUrl);
        for (let index = 0; index < subEvents.length; index++) {
          try {
            subEvents[index].subEventPoster = await uploadImageToCloudinary(subEvents[index].subEventPoster);
            console.log("SubEvent Poster:",subEvents[index].subEventPoster);
          } catch (error) {
            console.error(`Error uploading image for sub-event ${index}:`, error);
          }
        }
        const formData = new FormData();
        formData.append('eventTitle', eventDetails.eventTitle);       
        formData.append('eventDescription', eventDetails.eventDescription);
        formData.append('eventVenue', eventDetails.eventVenue);
        formData.append('event_start_date', eventDetails.eventStartDate);
        formData.append('event_end_date', eventDetails.eventEndDate);
        formData.append('eventPoster',uploadedImageUrl);
        formData.append('subEvents', JSON.stringify(subEvents));
      // console.log(uploadImageToCloudinary(eventDetails.eventPoster));
        // console.log(formData);
        // Iterate over the FormData entries
        for (let [key, value] of formData.entries()) {
          console.log("hi");
          console.log(`${key}: ${value}`);
        }

        const headers = {
          // 'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`,
        };

        // console.log(formData);

        const finalFormData = {
            eventTitle:eventDetails.eventTitle,
            eventDescription: eventDetails.eventDescription,
            eventVenue: eventDetails.eventVenue,
            event_start_date: eventDetails.eventStartDate,
            event_end_date: eventDetails.eventEndDate,
            eventPoster: uploadedImageUrl,
            subEvents: subEvents
        }
        console.log(finalFormData);
        await axios.post(`${apiUrl}/api/events/createEvent`,finalFormData,{headers})
        .then((response)=>{
          console.log(response.data);
          setEventDetails({
            eventTitle: '',
            eventDescription: '',
            eventVenue: '',
            eventStartDate: '',
            eventEndDate: '',
            eventPoster: null,
          })
          setSubEvents([]);
          setAlertMsg("Event Added Successfully");
          setErrorOcc(false);
          setOpen(true);
        })
        .catch((err)=>{
          console.log(err);
        })
        
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Grid container spacing={3} justifyContent="center">
      {/* Main Event Form */}
      <Grid item xs={12}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            p: 3,
            border: '1px solid #ccc',
            borderRadius: 2,
            boxShadow: 2,
          }}
        >
          <Typography variant="h5" mb={2} align="center">
            Add New Event
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Event Title"
                name="eventTitle"
                value={eventDetails.eventTitle}   
                onChange={handleInputChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Event Venue"
                name="eventVenue"
                value={eventDetails.eventVenue}
                onChange={handleInputChange}
                required
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Event Description"
            name="eventDescription"
            value={eventDetails.eventDescription}
            onChange={handleInputChange}
            margin="normal"
            required
            multiline
            rows={3} // Single-line description
        
          />
          <br />
          <br />
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                name="eventStartDate"
                type="date"
                value={eventDetails.eventStartDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                name="eventEndDate"
                type="date"
                value={eventDetails.eventEndDate}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
          </Grid>

          <Box display="flex" alignItems="center" mt={2}>
            <Button variant="contained" component="label">
              Upload Poster
              <input
                type="file"
                name="eventPoster"
                accept="image/*"
                onChange={handleInputChange}
                hidden
              />
            </Button>
            {eventDetails.eventPoster && (
              <Box display="flex" alignItems="center" ml={2}>
                <Typography variant="body2">{eventDetails.eventPoster.name}</Typography>
                <IconButton onClick={removePoster}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>
          {isMainEventComplete && (
            <Button variant="outlined" onClick={openSubEventModal} sx={{ mt: 3 }}>
              Add Sub-event
            </Button>
          )}
          <Box display="flex" justifyContent="center" mt={3}>
            <Button type="submit" variant="contained" color="primary">
              Add Event
            </Button>
          </Box>
        </Box>
      </Grid>

      

      {/* Sub-event Modal */}
      <Dialog open={isSubEventModalOpen} onClose={closeSubEventModal}>
        <DialogTitle>Add Sub-event</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Sub-event Title"
            name="subEventTitle"
            value={subEventDetails.subEventTitle}
            onChange={handleSubEventInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Sub-event Description"
            name="subEventDescription"
            value={subEventDetails.subEventDescription}
            onChange={handleSubEventInputChange}
            margin="normal"
            required
            multiline
            rows={5}
          />
          <TextField
            fullWidth
            label="Sub-event Venue"
            name="subEventVenue"
            value={subEventDetails.subEventVenue}
            onChange={handleSubEventInputChange}
            margin="normal"
            required
          />
          <TextField
            fullWidth
            label="Date"
            name="subEventDate"
            type="date"
            value={subEventDetails.subEventDate}
            onChange={handleSubEventInputChange}
            InputLabelProps={{ shrink: true }}
            required
          />
          <Box display="flex" alignItems="center" mt={2}>
            <Button variant="contained" component="label">
              Upload Poster
              <input
                type="file"
                name="subEventPoster"
                accept="image/*"
                onChange={handleSubEventInputChange}
                hidden
              />
            </Button>
            {subEventDetails.subEventPoster && (
              <Box display="flex" alignItems="center" ml={2}>
                <Typography variant="body2">{subEventDetails.subEventPoster.name}</Typography>
                <IconButton onClick={removeSubEventPoster}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeSubEventModal}>Cancel</Button>
          <Button onClick={addSubEvent} variant="contained" color="primary">
            Add Sub-event
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

export default EventForm;
