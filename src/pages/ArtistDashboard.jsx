import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Container, Typography, Grid, Paper, TextField, Button, FormControl,
  InputLabel, MenuItem, Select, Box
} from "@mui/material";
import { useAuth } from "../context/AuthContext"; // Ensure the path is correct

const MotionPaper = motion(Paper);

function ArtistDashboard() {
  const { user } = useAuth();
  const userId = user?.id;
  console.log("User id:", userId);

  const [artworks, setArtWorks] = useState([]);
  const [tipos, setTipos] = useState([]);
  const [newArtwork, setNewArtwork] = useState({
    title: '',
    description: '',
    imageBase64: '',
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    tecnica: '',
    tipo: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchTipos = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/tipos');
        console.log('Fetching tipos:', response);
        if (!response.ok) {
          throw new Error('Failed to fetch types');
        }
        const data = await response.json();
        console.log('Tipos fetched:', data);
        setTipos(data);
      } catch (error) {
        console.error('Error fetching types:', error);
      }
    };

    fetchTipos();
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024;
      if (file.size > maxSize) {
        alert("The image size exceeds the maximum limit of 5MB.");
        return;
      }

      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setNewArtwork(prev => ({ ...prev, imageBase64: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, description, year, month, day, tecnica, tipo, imageBase64 } = newArtwork;

    // Validar campos requeridos
    if (!title || !description || !year || !month || !day || !tecnica || !tipo || !imageBase64) {
      alert("Por favor, completa todos los campos y sube una imagen.");
      return;
    }

    if (!userId) {
      alert("Usuario no válido. Por favor, inicia sesión.");
      return;
    }

    const formattedDate = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    const artworkData = {
      titulo: title,
      descripcion: description,
      añoCreacion: formattedDate,
      imagen: imageBase64,
      tecnica: tecnica,
      tipo: { id: tipo },
      idUsuario: { id: userId }, // Verifica que el backend espera esta estructura
    };

    console.log("JSON enviado al backend:", artworkData);

    try {
      const response = await fetch("http://localhost:8080/api/obras", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(artworkData),
      });

      if (response.ok) {
        const newArtworkData = await response.json();
        setArtWorks([...artworks, newArtworkData]);
        // Reset form
        setNewArtwork({
          title: '',
          description: '',
          imageBase64: '',
          year: new Date().getFullYear(),
          month: new Date().getMonth() + 1,
          day: new Date().getDate(),
          tecnica: '',
          tipo: '',
        });
        setImageFile(null);
        setImagePreview(null);
        console.log("Obra guardada exitosamente:", newArtworkData);
      } else {
        const errorText = await response.text();
        console.error("Error al guardar la obra:", errorText);
        alert(`Error al guardar la obra: ${errorText || "Error desconocido."}`);
      }
    } catch (error) {
      console.error("Ocurrió un error al guardar la obra:", error);
      alert("Ocurrió un error al guardar la obra. Por favor, inténtalo de nuevo.");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4, background: 'linear-gradient(135deg, #f3e5f5, #e1bee7)' }}>
      <Typography variant="h3" component="h1" gutterBottom sx={{ textAlign: 'center', fontWeight: 'bold', color: '#6a1b9a' }}>
        Artist Dashboard
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            elevation={3}
            sx={{ p: 4, backgroundColor: '#fff', borderRadius: '16px' }}
          >
            <Typography variant="h5" gutterBottom sx={{ color: '#7b1fa2' }}> Upload New Artwork </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label="Title"
                margin="normal"
                value={newArtwork.title}
                onChange={(e) => setNewArtwork(prev => ({ ...prev, title: e.target.value }))}
                required
              />
              <TextField
                fullWidth
                label="Description"
                margin="normal"
                multiline
                rows={3}
                value={newArtwork.description}
                onChange={(e) => setNewArtwork(prev => ({ ...prev, description: e.target.value }))}
                required
              />
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Day</InputLabel>
                    <Select
                      value={newArtwork.day}
                      onChange={(e) => setNewArtwork(prev => ({ ...prev, day: e.target.value }))}
                      required
                    >
                      {[...Array(31)].map((_, i) => (
                        <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Month</InputLabel>
                    <Select
                      value={newArtwork.month}
                      onChange={(e) => setNewArtwork(prev => ({ ...prev, month: e.target.value }))}
                      required
                    >
                      {[...Array(12)].map((_, i) => (
                        <MenuItem key={i + 1} value={i + 1}>{i + 1}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={4}>
                  <TextField
                    fullWidth
                    label="Year"
                    type="number"
                    value={newArtwork.year}
                    onChange={(e) => setNewArtwork(prev => ({ ...prev, year: e.target.value }))}
                    required
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="Técnica"
                margin="normal"
                value={newArtwork.tecnica}
                onChange={(e) => setNewArtwork(prev => ({ ...prev, tecnica: e.target.value }))}
                required
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="tipo-label">Tipo</InputLabel>
                <Select
                  labelId="tipo-label"
                  value={newArtwork.tipo}
                  onChange={(e) => setNewArtwork(prev => ({ ...prev, tipo: e.target.value }))}
                  required
                >
                  {tipos.map((tipo) => (
                    <MenuItem key={tipo.id} value={tipo.id}>{tipo.nombre}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Typography variant="body1" sx={{ mt: 2 }}>Upload Image:</Typography>
              <input type="file" accept="image/*" onChange={handleImageUpload} required />
              {imagePreview && (
                <Box sx={{ mb: 2 }}>
                  <Typography variant="subtitle1">Image Preview:</Typography>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                </Box>
              )}
              <Button type="submit" variant="contained" color="primary" sx={{ mt: 4 }}>Submit</Button>
            </form>
          </MotionPaper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ArtistDashboard;