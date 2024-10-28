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

const StudentProfile = () => {
  const [student, setStudent] = useState(null);
  const [calls, setCalls] = useState([]);
  const [slots, setSlots] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    fetchStudent();
    fetchSlots();
  }, []);

  function formatDate(date) {
    const options = { month: "long", day: "numeric" };
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

  //   function findStatus(call) {
  //     const now = new Date();
  //     const start = new Date(call.start_time);
  //     const end = new Date(call.end_time);
  //     if (now < start) {
  //       return "Upcoming";
  //     } else if (now > end) {
  //       return "Completed";
  //     } else {
  //       return "In Progress";
  //     }
  //   }

  const fetchStudent = async () => {
    try {
      const response = await fetch(`/student/${id}`);
      const data = await response.json();

      setStudent(data);
      setCalls(data.calls);
    } catch (err) {
      setError("Failed to fetch student");
    }
  };

  const fetchSlots = async () => {
    try {
      const response = await fetch(`/slot?empty_student_id=true`);
      const data = await response.json();

      setSlots(data);
    } catch (err) {
      setError("Failed to fetch student");
    }
  };

  const bookCall = async (slot_id) => {
    const callResponse = await fetch("/call", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: id,
        slot_id: slot_id,
      }),
    });

    const slotResponse = await fetch(`/slot/${slot_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_id: id,
      }),
    });

    const created_call = await callResponse.json();
    const updated_slot = await slotResponse.json();
    setCalls([...slots, created_call]);
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

      <h2>Open Coaching Slots</h2>
      {slots && slots.length > 0 ? (
        <Paper>
          <List>
            {slots.map((slot, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={`Call with ${slot.coach_name} at ${formatDate(
                    new Date(slot.start_time)
                  )}`}
                  secondary={`Coach's contact: ${slot.coach_phone_number}`}
                />
                <Button
                  onClick={() => bookCall(slot.id)}
                  sx={{ backgroundColor: "#c71a4b", color: "white" }}
                >
                  Book Call
                </Button>
              </ListItem>
            ))}
          </List>
        </Paper>
      ) : (
        <Alert severity="info">No open coaching slots available</Alert>
      )}

      <h2>Your Calls</h2>
      {calls && calls.length > 0 && (
        <Paper>
          <List>
            {calls.map((call, index) => (
              <ListItem key={index} divider>
                <ListItemText
                  primary={`Call with ${call.coach_name} at ${formatDate(
                    new Date(call.start_time)
                  )}`}
                  secondary={`Coach's contact: ${call.coach_phone_number}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      )}
    </div>
  );
};

export default StudentProfile;
