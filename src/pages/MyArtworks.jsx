import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, Card, CardMedia, CardContent, Button } from '@mui/material';
import { useSpring, animated } from 'react-spring';
import { useAuth } from '../context/AuthContext';

const MyArtworks = () => {
  const { user, getToken } = useAuth();
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const token = getToken();
        const response = await fetch('http://localhost:8080/api/obras', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
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
  }, [user, getToken]);

  const fadeIn = useSpring({ opacity: 1, from: { opacity: 0 } });

  return (
    <Container sx={{ py: 4, backgroundColor: '#f9f4ef' }}>
      <Typography variant="h4" gutterBottom sx={{ color: '#4a4a4a', mb: 3 }}>
        My Artworks
      </Typography>
      {loading ? (
        <Typography variant="h6" color="textSecondary" align="center">
          Loading artworks...
        </Typography>
      ) : artworks.length > 0 ? (
        <Grid container spacing={4}>
          {artworks.map((artwork) => (
            <Grid item key={artwork.id} xs={12} sm={6} md={4}>
              <animated.div style={fadeIn}>
                <Card
                  sx={{
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s',
                    '&:hover': { transform: 'scale(1.05)' },
                    backgroundColor: '#ffffff',
                  }}
                >
                  <CardMedia
                    component="img"
                    height="180"
                    image={artwork.imagen}
                    alt={artwork.titulo}
                    sx={{ borderRadius: 1 }}
                  />
                  <CardContent>
                    <Typography variant="h6" sx={{ color: '#2c3e50' }}>{artwork.titulo}</Typography>
                  </CardContent>
                </Card>
              </animated.div>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography variant="h6" color="textSecondary" align="center">
          You have no artworks yet. Start creating and sharing your amazing artworks!
        </Typography>
      )}
      <Button
        variant="contained"
        color="primary"
        sx={{
          mt: 4,
          backgroundColor: '#7f8c8d',
          '&:hover': { backgroundColor: '#34495e' },
          textTransform: 'none',
        }}
        onClick={() => alert('Navigate to upload artwork page')}
      >
        Upload Artwork
      </Button>
    </Container>
  );
};

export default MyArtworks;