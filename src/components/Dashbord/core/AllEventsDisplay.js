import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Card, CardMedia, CardContent, Typography, Button, Grid } from '@mui/material';
import { LocationOn, CalendarToday } from '@mui/icons-material'; // Import icons
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../../context/Context';

function AllEventsDisplay() {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  // Fetch events using axios
  useEffect(() => {
    axios
      .get(`${apiUrl}/api/events`) // Replace with your backend API
      .then((response) => {
        setEvents(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching events:', error);
      });
  }, []);
  const {apiUrl} = useContext(AppContext);
  // Helper to format the date to YYYY-MM-DD
  const formatDate = (dateTime) => {
    const date = new Date(dateTime);
    return date.toISOString().split('T')[0]; // Extract YYYY-MM-DD
  };

  // Function to handle "View More" click
  const handleViewMore = (event) => {
    // Navigate to event details page and pass the event data via state
    navigate(`/dashboard/events/${event._id}`, { state: { event } });
  };

  return (
    <div>
      <Grid container spacing={2}>
        {events.map((event, index) => (
          <Grid item xs={12} md={6} lg={4} key={index}>
            <Card style={{ borderRadius: '16px', height: '100%' }}>
              {/* Image with title overlay */}
              <CardMedia
                component="img"
                height="200"
                image={event.eventPoster}
                alt={event.eventTitle}
              />
              <CardContent>
                {/* Title */}
                <Typography variant="h5" gutterBottom>
                  {event.eventTitle}
                </Typography>
                {/* Description */}
                <Typography variant="body2" color="textSecondary" paragraph>
                  {event.eventDescription.length > 60
                    ? `${event.eventDescription.substring(0, 60)}...`
                    : event.eventDescription}
                </Typography>
                {/* Dates */}
                <Typography variant="body2" color="textSecondary" display="flex" alignItems="center" gutterBottom>
                  <CalendarToday style={{ marginRight: '8px' }} />
                  {formatDate(event.event_start_date)} to {formatDate(event.event_end_date)}
                </Typography>
                {/* Location */}
                <Typography variant="body2" color="textSecondary" display="flex" alignItems="center">
                  <LocationOn style={{ marginRight: '8px' }} />
                  {event.eventVenue}
                </Typography>
                {/* View More Button */}
                <Button
                  variant="contained"
                  color="primary"
                  style={{ marginTop: '10px' }}
                  onClick={() => handleViewMore(event)} // Navigate to event details page using window.location.href
                >
                  View More
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default AllEventsDisplay;
