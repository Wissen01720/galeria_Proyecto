import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Container, Paper, Typography, TextField, Button, Box, 
  FormControl, Select, MenuItem, InputLabel, IconButton,
  InputAdornment, Avatar, Snackbar, Alert, ThemeProvider,
  createTheme
} from '@mui/material';
import {
  Person,
  Email,
  Lock,
  Visibility,
  VisibilityOff,
  HowToReg
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
    name: '',
    email: '',
    password: '',
    role: 'visitor'
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío
    await new Promise(resolve => setTimeout(resolve, 1000));
    setShowSuccess(true);
    setIsSubmitting(false);
    
    // Redireccionar después de mostrar el mensaje de éxito
    setTimeout(() => {
      navigate('/login');
    }, 2000);
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
                  label="Full Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                  type="email"
                  label="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                transition={{ delay: 0.5 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  type={showPassword ? 'text' : 'password'}
                  label="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                transition={{ delay: 0.6 }}
              >
                <FormControl fullWidth margin="normal">
                  <InputLabel>Role</InputLabel>
                  <Select
                    value={formData.role}
                    label="Role"
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    sx={{
                      transition: 'transform 0.2s ease-in-out',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <MenuItem value="visitor">Visitor</MenuItem>
                    <MenuItem value="artist">Artist</MenuItem>
                  </Select>
                </FormControl>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isSubmitting}
                  sx={{
                    mt: 3,
                    mb: 2,
                    background: 'linear-gradient(45deg, #7c4dff 30%, #ff4081 90%)',
                    transition: 'all 0.3s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 20px rgba(124, 77, 255, 0.3)',
                    },
                  }}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
                </Button>
              </motion.div>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                <Typography
                  variant="body2"
                  align="center"
                  sx={{
                    mt: 2,
                    cursor: 'pointer',
                    '&:hover': {
                      color: 'primary.main',
                    },
                  }}
                  onClick={() => navigate('/login')}
                >
                  Already have an account? Sign in
                </Typography>
              </motion.div>
            </form>
          </MotionPaper>
        </Box>

        <Snackbar
          open={showSuccess}
          autoHideDuration={2000}
          onClose={() => setShowSuccess(false)}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert severity="success" elevation={6} variant="filled">
            Account created successfully!
          </Alert>
        </Snackbar>
      </Container>
    </ThemeProvider>
  );
}

export default Register;