import { useState } from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Grid2, Card, CardContent, CardMedia, Dialog, DialogContent, Box } from '@mui/material';

const MotionCard = motion(Card);

const artworks = [
  {
    id: 1,
    title: "Starry Night",
    artist: "Vincent van Gogh",
    type: "painting",
    imageUrl: "https://example.com/starry-night.jpg",
    description: "The Starry Night is an oil on canvas painting by Dutch post-impressionist painter Vincent van Gogh.",
    year: 1889
  },
  // Add more artwork data here
];

function Gallery() {
  const [selectedArtwork, setSelectedArtwork] = useState(null);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom>
        Current Exhibitions
      </Typography>
      
      <Grid2 container spacing={3}>
        {artworks.map((artwork) => (
          <Grid2 item xs={12} sm={6} md={4} key={artwork.id}>
            <MotionCard whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} sx={{ cursor: 'pointer' }} onClick={() => setSelectedArtwork(artwork)}>
              <CardMedia component="img" height="200" image={artwork.imageUrl} alt={artwork.title}/>
              <CardContent>
                <Typography variant="h6" component="h3">
                  {artwork.title}
                </Typography>
                <Typography color="text.secondary">
                  {artwork.artist}
                </Typography>
              </CardContent>
            </MotionCard>
          </Grid2>
        ))}
      </Grid2>

      <Dialog open={Boolean(selectedArtwork)} onClose={() => setSelectedArtwork(null)} maxWidth="md" fullWidth>
        {selectedArtwork && (
          <DialogContent>
            <Grid2 container spacing={3}>
              <Grid2 item xs={12} md={6}>
                <img
                  src={selectedArtwork.imageUrl}
                  alt={selectedArtwork.title}
                  style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
                />
              </Grid2>
              <Grid2 item xs={12} md={6}>
                <Typography variant="h4" component="h2" gutterBottom>
                  {selectedArtwork.title}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  {selectedArtwork.artist}
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">
                    Year: {selectedArtwork.year}
                  </Typography>
                </Box>
                <Typography>
                  {selectedArtwork.description}
                </Typography>
              </Grid2>
            </Grid2>
          </DialogContent>
        )}
      </Dialog>
    </Container>
  );
}

export default Gallery;