import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Grid2, Paper, TextField, Button, Card, CardContent, IconButton, Box } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const MotionPaper = motion(Paper);
const MotionCard = motion(Card);

function AdminDashboard() {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: ''
  });

  const [users, setUsers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'artist' },
    // Add more user data here
  ]);

  const handleEventSubmit = (e) => {
    e.preventDefault();
    setEvents([...events, { ...newEvent, id: Date.now() }]);
    setNewEvent({ title: '', description: '', startDate: '', endDate: '', location: '' });
  };

  const handleDeleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Admin Dashboard
      </Typography>

      <Grid2 container spacing={4}>
        <Grid2 item xs={12} lg={6}>
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            elevation={3}
            sx={{ p: 3 }}
          >
            <Typography variant="h5" gutterBottom>
              Create New Event
            </Typography>
            <form onSubmit={handleEventSubmit}>
              <TextField
                fullWidth
                label="Event Title"
                margin="normal"
                value={newEvent.title}
                onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
                required
              />
              <TextField
                fullWidth
                label="Description"
                margin="normal"
                multiline
                rows={3}
                value={newEvent.description}
                onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
                required
              />
              <Grid2 container spacing={2} sx={{ my: 1 }}>
                <Grid2 item xs={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Start Date"
                    InputLabelProps={{ shrink: true }}
                    value={newEvent.startDate}
                    onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                    required
                  />
                </Grid2>
                <Grid2 item xs={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="End Date"
                    InputLabelProps={{ shrink: true }}
                    value={newEvent.endDate}
                    onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                    required
                  />
                </Grid2>
              </Grid2>
              <TextField
                fullWidth
                label="Location"
                margin="normal"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                required
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Create Event
              </Button>
            </form>
          </MotionPaper>
        </Grid2>

        <Grid2 item xs={12} lg={6}>
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            elevation={3}
            sx={{ p: 3 }}
          >
            <Typography variant="h5" gutterBottom>
              Manage Users
            </Typography>
            <Box sx={{ mt: 2 }}>
              {users.map((user) => (
                <MotionCard
                  key={user.id}
                  whileHover={{ scale: 1.02 }}
                  sx={{ mb: 2 }}
                >
                  <CardContent sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="h6">{user.name}</Typography>
                      <Typography color="text.secondary">{user.email}</Typography>
                      <Typography variant="caption" sx={{ textTransform: 'capitalize' }}>
                        {user.role}
                      </Typography>
                    </Box>
                    <IconButton
                      onClick={() => handleDeleteUser(user.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardContent>
                </MotionCard>
              ))}
            </Box>
          </MotionPaper>
        </Grid2>
      </Grid2>

      <MotionPaper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        elevation={3}
        sx={{ p: 3, mt: 4 }}
      >
        <Typography variant="h5" gutterBottom>
          Current Events
        </Typography>
        <Grid2 container spacing={3}>
          {events.map((event) => (
            <Grid2 item xs={12} md={6} lg={4} key={event.id}>
              <MotionCard
                whileHover={{ scale: 1.05 }}
              >
                <CardContent>
                  <Typography variant="h6">{event.title}</Typography>
                  <Typography color="text.secondary" sx={{ mb: 1 }}>
                    {event.description}
                  </Typography>
                  <Typography variant="body2">
                    Start: {event.startDate}
                  </Typography>
                  <Typography variant="body2">
                    End: {event.endDate}
                  </Typography>
                  <Typography variant="body2">
                    Location: {event.location}
                  </Typography>
                </CardContent>
              </MotionCard>
            </Grid2>
          ))}
        </Grid2>
      </MotionPaper>
    </Container>
  );
}

export default AdminDashboard;
