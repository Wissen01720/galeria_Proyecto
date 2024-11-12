package com.usta.gallery.controllers;

import com.usta.gallery.entities.LoginRequest;
import com.usta.gallery.entities.Usuarios;
import com.usta.gallery.repository.UsuariosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;
import java.util.logging.Logger;

@RestController
public class LoginController {

    @Autowired
    private UsuariosRepository usuariosRepository;

    private static final Logger logger = Logger.getLogger(LoginController.class.getName());

    @PostMapping("/api/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        logger.info("Login attempt with email: " + loginRequest.getEmail());

        Usuarios usuario = usuariosRepository.findByCorreo(loginRequest.getEmail());
        if (usuario == null) {
            logger.warning("User not found with email: " + loginRequest.getEmail());
            Map<String, String> response = new HashMap<>();
            response.put("message", "Invalid email or password");
            return ResponseEntity.status(401).body(response);
        }

        if (!usuario.getContrasena().equals(loginRequest.getPassword())) {
            logger.warning("Invalid password for email: " + loginRequest.getEmail());
            Map<String, String> response = new HashMap<>();
            response.put("message", "Invalid email or password");
            return ResponseEntity.status(401).body(response);
        }

        logger.info("Login successful for email: " + loginRequest.getEmail());
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Login successful");
        response.put("role", usuario.getRoles().getRol()); // Asegúrate de que el nombre del rol del usuario esté disponible aquí
        return ResponseEntity.ok(response);
    }

    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<?> handleIllegalArgumentException(IllegalArgumentException ex) {
        Map<String, String> response = new HashMap<>();
        response.put("message", ex.getMessage());
        return ResponseEntity.status(401).body(response);
    }
}