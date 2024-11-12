import React from 'react';
import { Typography, Grid, Container, Box, Button, Card, CardContent, CardMedia } from '@mui/material';
import { motion } from 'framer-motion';
import { styled } from '@mui/system';

const StyledContainer = styled(Container)(({ theme }) => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  background: 'linear-gradient(135deg, #e0f7fa 0%, #80deea 100%)',
  padding: theme.spacing(4),
}));

const StyledBox = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginBottom: theme.spacing(4),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1, 4),
  fontSize: '1.2rem',
  background: 'linear-gradient(45deg, #ff6f61 30%, #ff8e53 90%)',
  color: '#fff',
  '&:hover': {
    background: 'linear-gradient(45deg, #ff8e53 30%, #ff6f61 90%)',
  },
}));

const Home = () => {
  return (
    <StyledContainer maxWidth="lg">
      <StyledBox>
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h2" component="h1" gutterBottom sx={{ fontWeight: 'bold' }}>
            Welcome to the Art World
          </Typography>
          <Typography variant="h5" color="inherit" paragraph>
            Explore the finest collections of art from around the globe
          </Typography>
        </motion.div>
      </StyledBox>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <Grid container spacing={4} sx={{ mt: 6 }}>
          {[
            { title: 'Modern Art', image: 'modern_art', description: 'Experience the creativity and innovation of modern art.' },
            { title: 'Classical Art', image: 'classical_art', description: 'Dive into the timeless beauty of classical art.' },
            { title: 'Digital Art', image: 'digital_art', description: 'Discover the cutting-edge world of digital art.' },
          ].map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Card sx={{ maxWidth: 345, boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    height="140"
                    image={`images/${item.image}.jpg`}
                    alt={item.title}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {item.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.description}
                    </Typography>
                    <StyledButton variant="contained">Learn More</StyledButton>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </motion.div>
    </StyledContainer>
  );
};

export default Home;