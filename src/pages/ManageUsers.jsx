import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Grid,
  Card,
  CardContent,
  CardActions,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Snackbar,
  Alert,
  Box,
  CircularProgress,
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Person as PersonIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { motion, AnimatePresence } from 'framer-motion';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const ManageUsers = () => {
  // Estados
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    role: 'user', // Valor inicial para evitar problemas de componentes controlados y no controlados
    paisOrigen: '',
    fechaNacimiento: null,
  });
  const [searchTerm, setSearchTerm] = useState('');

  // Cargar usuarios
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/usuarios'); // Ajusta la URL según tu configuración
      const data = await response.json();
      setUsers(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      showSnackbar('Error al cargar usuarios', 'error');
      setLoading(false);
    }
  };

  const handleOpenDialog = (user = null) => {
    if (user) {
      setSelectedUser(user);
      setFormData({
        nombre: user.nombre,
        apellido: user.apellido,
        correo: user.correo,
        contrasena: user.contrasena,
        role: user.roles.rol.toLowerCase(), // Asegúrate de que el valor coincida con las opciones disponibles
        paisOrigen: user.paisOrigen || '',
        fechaNacimiento: user.fechaNacimiento || null,
      });
    } else {
      setSelectedUser(null);
      setFormData({
        nombre: '',
        apellido: '',
        correo: '',
        contrasena: '',
        role: 'user', // Valor inicial para evitar problemas de componentes controlados y no controlados
        paisOrigen: '',
        fechaNacimiento: null,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedUser(null);
    setFormData({
      nombre: '',
      apellido: '',
      correo: '',
      contrasena: '',
      role: 'user', // Valor inicial para evitar problemas de componentes controlados y no controlados
      paisOrigen: '',
      fechaNacimiento: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        ...formData,
        roles: { id: getRoleId(formData.role) } // Asegúrate de enviar el ID del rol
      };
      if (selectedUser) {
        // Actualizar usuario existente
        await updateUser(selectedUser.id, userData);
      } else {
        // Crear nuevo usuario
        await createUser(userData);
      }
      handleCloseDialog();
      fetchUsers();
      showSnackbar(
        `Usuario ${selectedUser ? 'actualizado' : 'creado'} exitosamente`,
        'success'
      );
    } catch (error) {
      console.error('Error:', error);
      showSnackbar(
        `Error al ${selectedUser ? 'actualizar' : 'crear'} usuario`,
        'error'
      );
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await deleteUser(userId);
        fetchUsers();
        showSnackbar('Usuario eliminado exitosamente', 'success');
      } catch (error) {
        console.error('Error:', error);
        showSnackbar('Error al eliminar usuario', 'error');
      }
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  // Funciones para conectar con tu backend
  const createUser = async (userData) => {
    await fetch('http://localhost:8080/api/usuarios', { // Ajusta la URL según tu configuración
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };

  const updateUser = async (userId, userData) => {
    await fetch(`http://localhost:8080/api/usuarios/${userId}`, { // Ajusta la URL según tu configuración
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
  };

  const deleteUser = async (userId) => {
    await fetch(`http://localhost:8080/api/usuarios/${userId}`, { // Ajusta la URL según tu configuración
      method: 'DELETE',
    });
  };

  // Obtener el ID del rol basado en el nombre del rol
  const getRoleId = (roleName) => {
    switch (roleName) {
      case 'admin':
        return 1;
      case 'artist':
        return 2;
      case 'user':
        return 3;
      default:
        return 3;
    }
  };

  // Filtrar usuarios basado en búsqueda
  const filteredUsers = users.filter(user =>
    user.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={3}
        sx={{
          p: 4,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Gestión de Usuarios
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{
              background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
              boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
            }}
          >
            Agregar Usuario
          </Button>
        </Box>

        <TextField
          fullWidth
          variant="outlined"
          placeholder="Buscar usuarios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 4 }}
        />

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            <AnimatePresence>
              {filteredUsers.map((user) => (
                <Grid item xs={12} sm={6} md={4} key={user.id}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      sx={{
                        height: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        transition: 'transform 0.3s ease-in-out',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
                        },
                      }}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <PersonIcon sx={{ mr: 1, color: 'primary.main' }} />
                          <Typography variant="h6" component="div">
                            {user.nombre}
                          </Typography>
                        </Box>
                        <Typography color="text.secondary">
                          {user.correo}
                        </Typography>
                        <Typography color="text.secondary">
                          Rol: {user.roles.rol}
                        </Typography>
                        <Typography color="text.secondary">
                          País de Origen: {user.paisOrigen}
                        </Typography>
                        <Typography color="text.secondary">
                          Fecha de Nacimiento: {user.fechaNacimiento}
                        </Typography>
                      </CardContent>
                      <CardActions sx={{ mt: 'auto' }}>
                        <IconButton
                          color="primary"
                          onClick={() => handleOpenDialog(user)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteUser(user.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </CardActions>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </AnimatePresence>
          </Grid>
        )}

        {/* Dialog para crear/editar usuario */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>
            {selectedUser ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
            <IconButton
              onClick={handleCloseDialog}
              sx={{ position: 'absolute', right: 8, top: 8 }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <form onSubmit={handleSubmit}>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nombre"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Apellido"
                    value={formData.apellido}
                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Contraseña"
                    type="password"
                    value={formData.contrasena}
                    onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="País de Origen"
                    value={formData.paisOrigen}
                    onChange={(e) => setFormData({ ...formData, paisOrigen: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="Fecha de Nacimiento"
                      value={formData.fechaNacimiento}
                      onChange={(newValue) => setFormData({ ...formData, fechaNacimiento: newValue })}
                      slotProps={{ textField: { fullWidth: true } }}
                    />
                  </LocalizationProvider>
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Rol</InputLabel>
                    <Select
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      required
                    >
                      <MenuItem value="admin">Administrador</MenuItem>
                      <MenuItem value="artist">Artista</MenuItem>
                      <MenuItem value="user">Usuario</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancelar</Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                {selectedUser ? 'Actualizar' : 'Crear'}
              </Button>
            </DialogActions>
          </form>
        </Dialog>

        {/* Snackbar para notificaciones */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={() => setOpenSnackbar(false)}
        >
          <Alert
            onClose={() => setOpenSnackbar(false)}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Paper>
    </Container>
  );
};

export default ManageUsers;