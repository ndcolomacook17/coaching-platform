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
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useParams, useNavigate } from "react-router-dom";

const CoachProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [coach, setCoaches] = useState(null);
  const [slots, setSlots] = useState([]);
  const [calls, setCalls] = useState([]);
  const [error, setError] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState("");
  useEffect(() => {
    fetchCoach();
  }, []);

  const fetchCoach = async () => {
    try {
      const response = await fetch(`/coach/${id}`);
      const data = await response.json();

      setCoaches(data);
      setSlots(data.slots);
    } catch (err) {
      setError("Failed to fetch todos");
    }
  };

  const createSlot = async () => {
    const response = await fetch("/slot", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        coach_id: id,
        start_time: selectedDateTime,
      }),
    });
    const created_slot = await response.json();
    setSlots([...slots, created_slot]);
  };

  function formatDate(date) {
    const options = { month: "long", day: "numeric" };
    console.log(date);
    const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
      date
    );

    // Format hours and minutes
    const time = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
      timeZoneName: "short",
    });
    return `${formattedDate}, ${time}`;
  }

  function findStatus(slot) {
    const now = new Date();
    const start = new Date(slot.start_time);
    const end = new Date(slot.end_time);
    if (now < start) {
      return "Upcoming";
    } else if (now > end) {
      return "Completed";
    } else {
      return "In Progress";
    }
  }

  const generateTimeOptions = () => {
    const options = [];
    const now = new Date(); // Current date and time

    const nextHour = new Date(now);
    nextHour.setMinutes(0);
    nextHour.setSeconds(0);
    nextHour.setMilliseconds(0);
    if (now.getMinutes() !== 0) {
      nextHour.setHours(nextHour.getHours() + 1);
    }

    for (let i = 0; i < 10; i++) {
      const optionDate = new Date(nextHour.getTime() + i * 60 * 60 * 1000); // Increment by one hour
      options.push({
        value: optionDate.toISOString(),
        label: optionDate.toLocaleString("en-US", {
          weekday: "long",
          month: "long",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        }),
      });
    }

    return options;
  };

  const timeOptions = generateTimeOptions();

  const handleChange = (event) => {
    setSelectedDateTime(event.target.value);
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
      <h2>Add Slot</h2>
      <Alert severity="info">All slots are 2 hour sessions.</Alert>

      {/* Wanted to use datepicker but had webpack compilation issues with AdapterDateFns */}
      {/* <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          value={new Date()}
          onChange={(date) => console.log(date)}
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider> */}
      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel id="slot-date-label">Select Slot</InputLabel>
        <Select
          labelId="slot-date-label"
          id="demo-simple-select"
          value={selectedDateTime}
          onChange={handleChange}
          label="Select Option"
        >
          {timeOptions.map((option, index) => (
            <MenuItem key={index} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button
        onClick={createSlot}
        sx={{ backgroundColor: "#c71a4b", color: "white" }}
      >
        Create Slot
      </Button>

      <h2>Your Slots</h2>
      <Paper>
        <List>
          {slots &&
            slots.map((slot, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={`${formatDate(
                    new Date(slot.start_time)
                  )}-${formatDate(new Date(slot.end_time))}, ${findStatus(
                    slot
                  )} `}
                  secondary={
                    <Typography color="gray">
                      {slot.call?.student_name ? (
                        <span>
                          {`Call Details:`} <br />
                          {`Student name: ${slot.call?.student_name}`} <br />
                          {`Student contact: ${slot.call?.student_phone_number}`}{" "}
                        </span>
                      ) : null}
                      <br />
                      {slot.call?.score && slot.call?.notes ? (
                        <span>
                          {<b>Review</b>}
                          <br />
                          {`Score: ${slot.call.score}`} <br />
                          {`Notes: ${slot.call.notes}`} <br />
                        </span>
                      ) : (
                        <Button
                          sx={{ backgroundColor: "#c71a4b", color: "white" }}
                          onClick={() => {
                            if (slot.call?.id) {
                              navigate(`/call_review/${slot.call.id}`);
                            } else {
                              console.log("No call associated with slot");
                            }
                          }}
                        >
                          Review
                        </Button>
                      )}
                    </Typography>
                  }
                />
              </ListItem>
            ))}
        </List>
      </Paper>
    </div>
  );
};

export default CoachProfile;
