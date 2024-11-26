import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Container, Paper, Typography, TextField, Button, Box, 
  FormControl, Select, MenuItem, InputLabel, IconButton,
  InputAdornment, Avatar, Snackbar, Alert, ThemeProvider,
  createTheme
} from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  HowToReg,
  CalendarToday,
  Public
} from '@mui/icons-material';

// Crear un tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#7c4dff',
      light: '#b47cff',
      dark: '#3f1dcb',
    },
    secondary: {
      main: '#ff4081',
      light: '#ff79b0',
      dark: '#c60055',
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#7c4dff',
              transition: 'all 0.3s ease-in-out',
            },
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontSize: '1rem',
          padding: '10px 24px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: '16px',
        },
      },
    },
  },
});

const MotionPaper = motion(Paper);

function Register() {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    correo: '',
    contrasena: '',
    fechaNacimiento: null,
    paisOrigen: '',
    roles: { id: 1 } // Asumiendo que 'visitor' tiene id 1
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('http://4.233.147.167:8080/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowSuccess(true);
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        setShowError(true);
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputProps = {
    sx: {
      '& .MuiOutlinedInput-root': {
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
        },
      },
    },
  };

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Container maxWidth="sm">
          <Box
            sx={{
              minHeight: '100vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              py: 8,
            }}
          >
            <MotionPaper
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              elevation={6}
              sx={{
                p: 4,
                width: '100%',
                background: 'linear-gradient(145deg, #ffffff 0%, #f8f9ff 100%)',
              }}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                style={{ textAlign: 'center', marginBottom: '2rem' }}
              >
                <Avatar
                  sx={{
                    margin: '0 auto',
                    bgcolor: 'primary.main',
                    width: 56,
                    height: 56,
                    mb: 2,
                  }}
                >
                  <HowToReg />
                </Avatar>
                <Typography
                  variant="h4"
                  component="h1"
                  gutterBottom
                  sx={{ fontWeight: 600 }}
                >
                  Create Account
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Join our community today
                </Typography>
              </motion.div>

              <form onSubmit={handleSubmit}>
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="First Name"
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    {...inputProps}
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Last Name"
                    value={formData.apellido}
                    onChange={(e) => setFormData({ ...formData, apellido: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Person color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    {...inputProps}
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    type="email"
                    label="Email Address"
                    value={formData.correo}
                    onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Email color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    {...inputProps}
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    label="Password"
                    value={formData.contrasena}
                    onChange={(e) => setFormData({ ...formData, contrasena: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Lock color="primary" />
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    {...inputProps}
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  <DatePicker
                    label="Date of Birth"
                    value={formData.fechaNacimiento}
                    onChange={(newValue) => setFormData({ ...formData, fechaNacimiento: newValue })}
                    slotProps={{
                      textField: {
                        fullWidth: true,
                        margin: "normal",
                        InputProps: {
                          startAdornment: (
                            <InputAdornment position="start">
                              <CalendarToday color="primary" />
                            </InputAdornment>
                          ),
                          ...inputProps,
                        },
                      },
                    }}
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <TextField
                    margin="normal"
                    required
                    fullWidth
                    label="Country of Origin"
                    value={formData.paisOrigen}
                    onChange={(e) => setFormData({ ...formData, paisOrigen: e.target.value })}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Public color="primary" />
                        </InputAdornment>
                      ),
                    }}
                    {...inputProps}
                  />
                </motion.div>

                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.9 }}
                >
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="role-label">Role</InputLabel>
                    <Select
                      labelId="role-label"
                      value={formData.roles.id}
                      onChange={(e) => setFormData({ ...formData, roles: { id: e.target.value } })}
                    >
                      <MenuItem value={1}>Visitor</MenuItem>
                      <MenuItem value={2}>Artist</MenuItem>
                    </Select>
                  </FormControl>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ mt: 3 }}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Register'}
                  </Button>
                </motion.div>
              </form>
            </MotionPaper>
          </Box>

          <Snackbar
            open={showSuccess}
            autoHideDuration={4000}
            onClose={() => setShowSuccess(false)}
          >
            <Alert severity="success" onClose={() => setShowSuccess(false)}>
              Registration successful!
            </Alert>
          </Snackbar>
          <Snackbar
            open={showError}
            autoHideDuration={4000}
            onClose={() => setShowError(false)}
          >
            <Alert severity="error" onClose={() => setShowError(false)}>
              Registration failed. Please try again.
            </Alert>
          </Snackbar>
        </Container>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default Register;