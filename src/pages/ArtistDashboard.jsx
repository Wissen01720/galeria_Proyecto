import { useState } from "react";
import { motion } from "framer-motion";
import { Container, Typography, Grid2, Paper, TextField, Button, Card, CardContent, Box, CardMedia, FormControl, InputLabel, MenuItem } from "@mui/material";

const MotionPaper = motion(Paper);
const MotionCard = motion(Card);

function ArtistDashboard() {
    const [artworks, setArtWorks] = useState([]);
    const [newArtwork, setNewArtwork] = useState({
        title: '',
        description: '',
        type: 'painting',
        imageUrl: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setArtWorks([...artworks, { ...newArtwork, id: Date.now()}]);
        setNewArtwork({ title: '', description: '', type: 'painting', imageUrl: '' });
    };

    return (
        <Container maxWidth="lg" sx={{ width: '100%' }}>
            <Typography variant="h3" componet="h1" gutterBotton>
                Artist Dashboard
            </Typography>

            <Grid2 container spacing={4}>
                <Grid2 item xs={12} md={6}>
                    <MotionPaper intial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBotton> Upload New Artwork </Typography>
                        <form onSubmit={handleSubmit}>
                            <TextField fullWidth label="Title" margin="normal" value={newArtwork.title} onChange={(e) => setNewArtwork({ ...newArtwork, title: e.target.value })} required />
                            <TextField fullWidth label="Description" margin="normal" multiline rows={3} value={newArtwork.description} onChange={(e) => setNewArtwork({ ...newArtwork, description: e.target.value })} required />
                            <FormControl fullWidth margin="normal">
                                <InputLabel>Type</InputLabel>
                                <select value={newArtwork.type} label='Type' onChange={(e) => setNewArtwork({ ...newArtwork, type: e.target.value })} required>
                                    <MenuItem value="painting">Painting</MenuItem>
                                    <MenuItem value="photography">Photograph</MenuItem>
                                </select>
                            </FormControl>
                            <TextField fullWidth label="Image URL" margin="normal" value={newArtwork.imageUrl} onChange={(e) => setNewArtwork({ ...newArtwork, imageUrl: e.target.value })} required />
                            <Button type="submit" variant="contained" fullWidth sx= {{ mt:2 }}>Upload</Button>
                        </form>
                    </MotionPaper>
                </Grid2>
                <Grid2 item xs-12 md={6}>
                    <MotionPaper initial={{opacity:0, x:20}} animate={{ opacity:1, x: 0}} elevation={3} sx={{ p: 3 }}>
                        <Typography variant="h5" gutterBotton> Your Artworks </Typography>
                        <Box sx={{ mt: 2 }}>
                            {artworks.map((artwork) => (
                                <MotionCard key={artwork.id} sx={{ mb: 2 }}>
                                    <CardMedia component="img" height="200" image={artwork.imageUrl} alt = {artwork.title} />
                                    <CardContent>
                                        <Typography variant="h6" gutterBotton> {artwork.title} </Typography>
                                        <Typography color="text.sectondary" sx={{textTransform: 'capitalize'}} >{artwork.type}</Typography>
                                        <Typography variant="body2" sx={{ mt: 1 }}>{artwork.description}</Typography>
                                    </CardContent>
                                </MotionCard>
                            ))}
                        </Box>
                    </MotionPaper>
                </Grid2>
            </Grid2>
        </Container>
    );
}

export default ArtistDashboard;