import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Card, CardContent, Box } from '@mui/material';
import { format, isBefore, isAfter } from 'date-fns';
import { fetchExposiciones } from './api';

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null);

  useEffect(() => {
    const fetchAllEvents = async () => {
      try {
        const data = await fetchExposiciones();
        setEvents(data);

        const now = new Date();
        const ongoingEvent = data.find(event => 
          isBefore(new Date(event.fechaInicio), now) && isAfter(new Date(event.fechaFin), now)
        );
        setCurrentEvent(ongoingEvent);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchAllEvents();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Eventos
      </Typography>
      {currentEvent && (
        <Box mb={4}>
          <Typography variant="h5" gutterBottom>
            Evento en Curso
          </Typography>
          <Card>
            <CardContent>
              <Typography variant="h6">{currentEvent.titulo}</Typography>
              <Typography variant="body2" color="textSecondary">
                {currentEvent.descripcion}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Inicio: {format(new Date(currentEvent.fechaInicio), 'dd/MM/yyyy')}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Fin: {format(new Date(currentEvent.fechaFin), 'dd/MM/yyyy')}
              </Typography>
            </CardContent>
          </Card>
        </Box>
      )}
      <Typography variant="h5" gutterBottom>
        Todos los Eventos
      </Typography>
      <Grid container spacing={3}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card>
              <CardContent>
                <Typography variant="h6">{event.titulo}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {event.descripcion}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Inicio: {format(new Date(event.fechaInicio), 'dd/MM/yyyy')}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Fin: {format(new Date(event.fechaFin), 'dd/MM/yyyy')}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default EventsSection;