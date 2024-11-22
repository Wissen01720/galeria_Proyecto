import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import { Container, Typography, Card, CardContent, CardMedia } from '@mui/material';
import { fetchArtworksByTechniqueAndCategory } from './api'; // Asegúrate de tener una función para obtener las obras

const ArtworkCarousel = ({ technique, category }) => {
  const [artworks, setArtworks] = useState([]);

  useEffect(() => {
    const fetchArtworks = async () => {
      try {
        const data = await fetchArtworksByTechniqueAndCategory(technique, category);
        setArtworks(data);
      } catch (error) {
        console.error('Error fetching artworks:', error);
      }
    };

    fetchArtworks();
  }, [technique, category]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Obras de {technique} en {category}
      </Typography>
      <Slider {...settings}>
        {artworks.map((artwork) => (
          <Card key={artwork.id}>
            <CardMedia
              component="img"
              height="200"
              image={artwork.imageUrl}
              alt={artwork.title}
            />
            <CardContent>
              <Typography variant="h6">{artwork.title}</Typography>
              <Typography variant="body2" color="textSecondary">
                {artwork.description}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Slider>
    </Container>
  );
};

export default ArtworkCarousel;