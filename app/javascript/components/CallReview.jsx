import React, { useState, useEffect } from "react";
import {
  Button,
  Paper,
  List,
  ListItem,
  ListItemText,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  TextField,
} from "@mui/material";
import { useParams } from "react-router-dom";

const CallReview = () => {
  const { id } = useParams();
  const [call, setCall] = useState(null);
  const [selectedScore, setSelectedScore] = useState("");
  const [notesValue, setNotesValue] = useState("");

  const updateCallDetails = async () => {
    const response = await fetch(`/call/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: id,
        score: selectedScore,
        notes: notesValue,
      }),
    });
    // const created_slot = await response.json();
    // setSlots([...slots, created_slot]);
  };

  const scoreOptions = [
    { value: 1, label: "1" },
    { value: 2, label: "2" },
    { value: 3, label: "3" },
    { value: 4, label: "4" },
    { value: 5, label: "5" },
  ];

  const handleScoreChange = (event) => {
    setSelectedScore(event.target.value);
  };

  const handleNotesChange = (event) => {
    setNotesValue(event.target.value);
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ backgroundColor: "#c71a4b" }}>
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Welcome!
            </Typography>
            <Button color="inherit">Logout</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <h2>Add Call Review</h2>
      <h3>Score</h3>
      <Alert severity="info">
        Select a rating from 1-5 for your coaching session.
      </Alert>
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="slot-date-label">Select Rating</InputLabel>
        <Select
          labelId="slot-date-label"
          id="demo-simple-select"
          value={selectedScore}
          onChange={handleScoreChange}
          label="Select Option"
        >
          {scoreOptions.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.value}
            </MenuItem>
          ))}
        </Select>
        <h3>Feedback</h3>
        <Alert severity="info">
          Fill in some details on what went well, what could be improved for
          next time, and goals you set for next session.
        </Alert>

        <TextField
          variant="outlined"
          value={notesValue}
          onChange={handleNotesChange}
          fullWidth
        />
      </FormControl>
      <Button
        onClick={updateCallDetails}
        sx={{ backgroundColor: "#c71a4b", color: "white" }}
      >
        Submit Review
      </Button>
    </div>
  );
};

export default CallReview;
