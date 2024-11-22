import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Container, Typography, Grid, Paper, TextField, Button, IconButton, MenuItem, Select, InputLabel, FormControl, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';

const MotionPaper = motion(Paper);

function AdminDashboard() {
  const [categories, setCategories] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    startDate: '',
    endDate: '',
    location: '',
    categoria: ''
  });
  const [newCategory, setNewCategory] = useState('');
  const [editCategoryId, setEditCategoryId] = useState(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/categorias');
        if (!response.ok) {
          throw new Error('Error fetching categories');
        }
        const data = await response.json();
        if (Array.isArray(data)) {
          setCategories(data);
        } else {
          throw new Error('Categories data is not an array');
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleEventSubmit = async (e) => {
    e.preventDefault();
  
    if (!newEvent.title) {
      alert("El título de la exposición es obligatorio.");
      return;
    }
  
    try {
      const eventToSubmit = {
        titulo: newEvent.title,
        descripcion: newEvent.description,
        fechaInicio: newEvent.startDate,
        fechaFin: newEvent.endDate,
        ubicacion: newEvent.location,
        categoria: { id: newEvent.categoria },
      };
      
      console.log('Event to submit:', eventToSubmit);
      
      const response = await fetch('http://localhost:8080/api/exposiciones', {
        method: 'POST',
        body: JSON.stringify(eventToSubmit),
        headers: {
          'Content-Type': 'application/json',
        },
      });      
  
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }
  
      const data = await response.json();
      console.log('Exposición creada:', data);
  
      setNewEvent({ title: '', description: '', startDate: '', endDate: '', location: '', categoria: '' });
  
    } catch (error) {
      console.error('Error creating event:', error.message || error);
    }
  };      

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/categorias', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoria: newCategory }),
      });
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }
      const data = await response.json();
      setCategories([...categories, data]);
      setNewCategory('');
    } catch (error) {
      console.error('Error creating category:', error.message || error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/categorias/${categoryId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }
      setCategories(categories.filter(category => category.id !== categoryId));
    } catch (error) {
      console.error('Error deleting category:', error.message || error);
    }
  };

  const handleEditCategory = (category) => {
    setEditCategoryId(category.id);
    setEditCategoryName(category.categoria);
  };

  const handleSaveCategory = async (categoryId) => {
    try {
      const response = await fetch(`http://localhost:8080/api/categorias/${categoryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoria: editCategoryName }),
      });
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(errorData);
      }
      const data = await response.json();
      setCategories(categories.map(category => (category.id === categoryId ? data : category)));
      setEditCategoryId(null);
      setEditCategoryName('');
    } catch (error) {
      console.error('Error updating category:', error.message || error);
    }
  };

  const handleCancelEdit = () => {
    setEditCategoryId(null);
    setEditCategoryName('');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <MotionPaper
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        elevation={3}
        sx={{ p: 3, mb: 4, backgroundColor: '#f5f5f5' }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          Admin Dashboard
        </Typography>
      </MotionPaper>

      <Grid container spacing={4}>
        <Grid item xs={12} lg={6}>
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            elevation={3}
            sx={{ p: 3, backgroundColor: '#e3f2fd' }}
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
              <Grid container spacing={2} sx={{ my: 1 }}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="Start Date"
                    InputLabelProps={{ shrink: true }}
                    value={newEvent.startDate}
                    onChange={(e) => setNewEvent({ ...newEvent, startDate: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="date"
                    label="End Date"
                    InputLabelProps={{ shrink: true }}
                    value={newEvent.endDate}
                    onChange={(e) => setNewEvent({ ...newEvent, endDate: e.target.value })}
                    required
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                label="Location"
                margin="normal"
                value={newEvent.location}
                onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
                required
              />
              <FormControl fullWidth margin="normal">
                <InputLabel id="categoria-label">Category</InputLabel>
                <Select
                  labelId="categoria-label"
                  value={newEvent.categoria}
                  onChange={(e) => setNewEvent({ ...newEvent, categoria: e.target.value })}
                  required
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.categoria}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
        </Grid>

        <Grid item xs={12} lg={6}>
          <MotionPaper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            elevation={3}
            sx={{ p: 3, backgroundColor: '#e8f5e9' }}
          >
            <Typography variant="h5" gutterBottom>
              Manage Categories
            </Typography>
            <form onSubmit={handleCategorySubmit}>
              <TextField
                fullWidth
                label="New Category"
                margin="normal"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                required
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{ mt: 2 }}
              >
                Add Category
              </Button>
            </form>
            <TableContainer component={Paper} sx={{ mt: 4 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {categories.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((category) => (
                    <TableRow key={category.id}>
                      <TableCell>
                        {editCategoryId === category.id ? (
                          <TextField
                            fullWidth
                            value={editCategoryName}
                            onChange={(e) => setEditCategoryName(e.target.value)}
                          />
                        ) : (
                          category.categoria
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {editCategoryId === category.id ? (
                          <>
                            <IconButton onClick={() => handleSaveCategory(category.id)} color="primary">
                              <SaveIcon />
                            </IconButton>
                            <IconButton onClick={handleCancelEdit} color="secondary">
                              <CancelIcon />
                            </IconButton>
                          </>
                        ) : (
                          <>
                            <IconButton onClick={() => handleEditCategory(category)} color="primary">
                              <EditIcon />
                            </IconButton>
                            <IconButton onClick={() => handleDeleteCategory(category.id)} color="error">
                              <DeleteIcon />
                            </IconButton>
                          </>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={categories.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </MotionPaper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdminDashboard;