import React, { useEffect, useState } from 'react';
import { Typography, Grid, Box, Button, Card, CardContent, CardMedia, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';
import EventsSection from './EventsSection';

const FullWidthWrapper = styled(Box)({
  width: '100vw',
  minHeight: '100vh',
  margin: 0,
  padding: 0,
  position: 'relative',
  left: '50%',
  right: '50%',
  marginLeft: '-50vw',
  marginRight: '-50vw',
  background: 'linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)',
});

const ContentWrapper = styled(Box)({
  maxWidth: '1200px',
  margin: '0 auto',
  padding: '2rem',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
});

const StyledButton = styled(Button)({
  marginTop: '16px',
  padding: '8px 32px',
  fontSize: '1.1rem',
  backgroundColor: '#ff6f61',
  color: '#fff',
  '&:hover': {
    backgroundColor: '#ff8e53',
  },
});

const StyledCard = styled(Card)({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#ffffff',
  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-8px)',
  },
});

const Home = () => {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/obras');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setArtworks(data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArtworks();
  }, []);

  const handleLearnMore = (artwork) => {
    setSelectedArtwork(artwork);
  };

  const handleClose = () => {
    setSelectedArtwork(null);
  };

  return (
    <FullWidthWrapper>
      <ContentWrapper>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ width: '100%', textAlign: 'center' }}
        >
          <Typography 
            variant="h2" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              color: '#1a237e',
              mb: 3,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Welcome to the Art World
          </Typography>
          <Typography 
            variant="h5" 
            sx={{ 
              color: '#37474f',
              mb: 6,
              fontSize: { xs: '1.2rem', md: '1.5rem' }
            }}
          >
            Explore the finest collections of art from around the globe
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{ width: '100%' }}
        >
          {loading ? (
            <Typography variant="h6" color="textSecondary" align="center">
              Loading artworks...
            </Typography>
          ) : artworks.length > 0 ? (
            <Grid container spacing={4}>
              {artworks.map((artwork) => (
                <Grid item xs={12} sm={6} md={4} key={artwork.id}>
                  <StyledCard>
                    <CardMedia
                      component="img"
                      height="200"
                      image={artwork.imagen}
                      alt={artwork.titulo}
                      sx={{ objectFit: 'cover' }}
                    />
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                      <div>
                        <Typography 
                          variant="h5" 
                          component="h2"
                          sx={{ 
                            color: '#1a237e',
                            mb: 1,
                            fontWeight: 500
                          }}
                        >
                          {artwork.titulo}
                        </Typography>
                        <Typography 
                          variant="body1"
                          sx={{ 
                            color: '#546e7a',
                            mb: 2
                          }}
                        >
                          {artwork.descripcion}
                        </Typography>
                      </div>
                      <StyledButton variant="contained" onClick={() => handleLearnMore(artwork)}>
                        LEARN MORE
                      </StyledButton>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          ) : (
            <Typography variant="h6" color="textSecondary" align="center">
              No artworks available. Start creating and sharing your amazing artworks!
            </Typography>
          )}
        </motion.div>

        <EventsSection />

        {selectedArtwork && (
          <Dialog open={Boolean(selectedArtwork)} onClose={handleClose} maxWidth="md" fullWidth>
            <DialogTitle>{selectedArtwork.titulo}</DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <img
                    src={selectedArtwork.imagen}
                    alt={selectedArtwork.titulo}
                    style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Description</Typography>
                  <Typography variant="body1" paragraph>{selectedArtwork.descripcion}</Typography>
                  <Typography variant="h6" gutterBottom>Technique</Typography>
                  <Typography variant="body1" paragraph>{selectedArtwork.tecnica}</Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </ContentWrapper>
    </FullWidthWrapper>
  );
};

export default Home;