import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import EditWindow from "./EditWindow.js";
import DeleteWindow from "./DeleteWindow.js";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  Box,
} from "@mui/material";
import "./AllTestimonials.css";
import { AppContext } from "../../../../context/Context.js";
const AllTestimonials = () => {
  const [testimonials, setTestimonials] = useState();
  const {apiUrl} = useContext(AppContext)
  const [selected, setSelected] = useState();
  const [editWindow, setEditWindow] = useState(false);
  const [deleteWindow, setDeleteWindow] = useState(false);
  useEffect(() => {
    axios.get(`${apiUrl}/api/testimonials/`).then((res) => {
      console.log(res.data);
      setTestimonials(res.data);
    });
  }, []);
  const handleClose = async(type) => {
    type === "edit" ? setEditWindow(false) : setDeleteWindow(false);
   await axios.get(`${apiUrl}/api/testimonials/`).then((res) => {
      console.log(res.data);
      setTestimonials(res.data);
    });
  };
  const navigate = useNavigate();
  return (
    <div>
      <h5>All testimonials</h5>
      <div>
        <table className="testimonial-table" border="1px">
          <thead>
            <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Discipline</th>
            <th>Rating</th>
            <th>Message</th>

            <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials &&
              testimonials.map((testimonial, index) => {
                return (
                  <tr key={testimonial._id}>
                    <td>{index + 1}</td>
                    <td>{testimonial.name}</td>
                    <td>{testimonial.discipline}</td>
                    <td>{testimonial.rating}</td>
                    <td
                      className="message"
                      style={{
                        width: "25vw",
                        wordWrap: "break-word",
                        overflow: "hidden",
                        whiteSpace: "normal",
                      }}>
                      {testimonial.message}
                    </td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={() => {
                          setSelected(testimonial);
                          setEditWindow(true);
                        }}>
                        <EditIcon />
                      </button>
                      &nbsp;
                      <button
                        className="btn btn-danger"
                        onClick={() => {
                          setSelected(testimonial);
                          setDeleteWindow(true);
                        }}>
                        <DeleteIcon />
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
        <div className="cardContainer">
          <Box sx={{ padding: 1 }}>
            {testimonials && testimonials.map((testimonial, index) => (
              <Card
                key={testimonial._id}
                sx={{
                  maxWidth: "100vw",
                  margin: "auto",
                  marginBottom: 2,
                }}>
                <CardContent>
                  <Typography variant="h6" component="div">
                    {index + 1}. {testimonial.name}
                  </Typography>
                  <Typography color="text.secondary" gutterBottom>
                    Discipline: {testimonial.discipline}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {testimonial.rating}
                  </Typography>
                  {/* <Box
                            sx={{
                              width: "100vw",
                              wordWrap: "break-word",
                              overflow: "hidden",
                              whiteSpace: "normal",
                              mt: 1,
                            }} */}
                  {/* // className="message"> */}
                  {/* <Typography variant="body1" component="p"> */}
                  {testimonial.message}
                  {/* </Typography> */}
                  {/* </Box> */}
                </CardContent>
                <CardActions>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => {
                      setSelected(testimonial);
                      setEditWindow(true);
                    }}>
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => {
                      setSelected(testimonial);
                      setDeleteWindow(true);
                    }}>
                    Delete
                  </Button>
                </CardActions>
              </Card>
            ))}
          </Box>
        </div>
      </div>
      {editWindow && (
        <EditWindow testimonial={selected} handleClose={handleClose} />
      )}
      {deleteWindow && (
        <DeleteWindow testimonial={selected} handleClose={handleClose} />
      )}
    </div>
  );
};

export default AllTestimonials;
