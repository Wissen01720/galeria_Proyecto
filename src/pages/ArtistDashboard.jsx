import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
    Container, Typography, Grid, Paper, TextField, Button, Card,
    CardContent, Box, CardMedia, FormControl, InputLabel, MenuItem, Select
} from "@mui/material";

const MotionPaper = motion(Paper);
const MotionCard = motion(Card);

function ArtistDashboard() {
    const [artworks, setArtWorks] = useState([]);
    const [tipos, setTipos] = useState([]);
    const [newArtwork, setNewArtwork] = useState({
        title: '',
        description: '',
        imageUrl: '', // Guardar URL de imagen
        year: new Date().getFullYear(),
        tecnica: '',
        tipo: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        const fetchTipos = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/tipos');
                if (!response.ok) {
                    throw new Error('Failed to fetch types');
                }
                const data = await response.json();
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
            setImagePreview(URL.createObjectURL(file));
            setImageFile(file);
            setNewArtwork({ ...newArtwork, imageUrl: file.name });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const añoCreacion = parseInt(newArtwork.year, 10);
        if (isNaN(añoCreacion)) {
            alert("Por favor, ingresa un año válido.");
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append("titulo", newArtwork.title);
        formDataToSend.append("descripcion", newArtwork.description);
        formDataToSend.append("añoCreacion", añoCreacion);
        formDataToSend.append("file", imageFile);

        try {
            const response = await fetch("http://localhost:8080/api/obras", {
                method: "POST",
                body: formDataToSend,
            });

            if (response.ok) {
                const newArtworkData = await response.json();
                setArtWorks([...artworks, newArtworkData]);
            } else {
                const error = await response.json();
                console.error("Failed to save artwork:", error);
            }
        } catch (error) {
            console.error("An error occurred while saving the artwork:", error);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ width: '100%', py: 4, background: 'linear-gradient(135deg, #f3e5f5, #e1bee7)' }}>
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
                                onChange={(e) => setNewArtwork({ ...newArtwork, title: e.target.value })}
                                required
                            />
                            <TextField
                                fullWidth
                                label="Description"
                                margin="normal"
                                multiline
                                rows={3}
                                value={newArtwork.description}
                                onChange={(e) => setNewArtwork({ ...newArtwork, description: e.target.value })}
                                required
                            />
                            <TextField
                                fullWidth
                                label="Year"
                                margin="normal"
                                type="number"
                                value={newArtwork.year}
                                onChange={(e) => setNewArtwork({ ...newArtwork, year: e.target.value })}
                                required
                            />
                            <TextField
                                fullWidth
                                label="Técnicas (separadas por comas)"
                                margin="normal"
                                value={newArtwork.tecnica}
                                onChange={(e) => setNewArtwork({ ...newArtwork, tecnica: e.target.value })}
                                required
                            />
                            <FormControl fullWidth margin="normal">
                                <InputLabel id="tipo-label">Tipo</InputLabel>
                                <Select
                                    labelId="tipo-label"
                                    value={newArtwork.tipo}
                                    onChange={(e) => setNewArtwork({ ...newArtwork, tipo: e.target.value })}
                                    required
                                >
                                    {Array.isArray(tipos) && tipos.length > 0 ? (
                                        tipos.map((tipo) => (
                                            <MenuItem key={tipo.id} value={tipo.id}>{tipo.nombre}</MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No options available</MenuItem>
                                    )}
                                </Select>
                            </FormControl>
                            <Typography variant="body1" sx={{ mt: 2 }}>Upload Image:</Typography>
                            <input type="file" accept="image/*" onChange={handleImageUpload} style={{ marginTop: '8px', marginBottom: '16px' }} />
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
                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{ mt: 2, backgroundColor: '#8e24aa', '&:hover': { backgroundColor: '#6a1b9a' } }}
                            >
                                Upload
                            </Button>
                        </form>
                    </MotionPaper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <MotionPaper
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5 }}
                        elevation={3}
                        sx={{ p: 4, backgroundColor: '#f3e5f5', borderRadius: '16px' }}
                    >
                        <Typography variant="h5" gutterBottom sx={{ color: '#7b1fa2' }}> Your Artworks </Typography>
                        <Box sx={{ mt: 2 }}>
                            {artworks.length > 0 ? (
                                artworks.map((artwork) => (
                                    <MotionCard key={artwork.id} sx={{ mb: 2, overflow: 'hidden', borderRadius: '12px', backgroundColor: '#fff' }} whileHover={{ scale: 1.05 }}>
                                        <CardMedia component="img" height="200" image={artwork.imageUrl} alt={artwork.title} />
                                        <CardContent>
                                            <Typography variant="h6" gutterBottom> {artwork.title} </Typography>
                                            <Typography color="text.secondary"> {artwork.descripcion} </Typography>
                                            <Typography variant="body2" sx={{ mt: 1 }}> {artwork.añoCreacion} </Typography>
                                        </CardContent>
                                    </MotionCard>
                                ))
                            ) : (
                                <Typography variant="body1" color="text.secondary"> No artworks uploaded yet. </Typography>
                            )}
                        </Box>
                    </MotionPaper>
                </Grid>
            </Grid>
        </Container>
    );
}

export default ArtistDashboard;