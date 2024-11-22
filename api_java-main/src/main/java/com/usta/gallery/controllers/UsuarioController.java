// UsuarioController.java
package com.usta.gallery.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.usta.gallery.entities.Usuarios;
import com.usta.gallery.entities.Roles;
import com.usta.gallery.repository.UsuariosRepository;
import com.usta.gallery.repository.RolRepository;

import java.util.Optional;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "http://localhost:5173")
public class UsuarioController {

    @Autowired
    private UsuariosRepository usuarioRepository;

    @Autowired
    private RolRepository rolesRepository;

    // Obtener todos los usuarios
    @GetMapping
    public ResponseEntity<Iterable<Usuarios>> getAllUsuarios() {
        return ResponseEntity.ok(usuarioRepository.findAll());
    }

    // Obtener usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<Usuarios> getUsuarioById(@PathVariable Long id) {
        Optional<Usuarios> usuario = usuarioRepository.findById(id);
        return usuario.map(ResponseEntity::ok)
                      .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear un nuevo usuario
    @PostMapping
    public ResponseEntity<Usuarios> createUsuario(@Valid @RequestBody Usuarios usuario) {
        // Verificar que el rol exista
        Optional<Roles> rol = rolesRepository.findById(usuario.getRoles().getId());
        if (!rol.isPresent()) {
            return ResponseEntity.badRequest().build();
        }
        usuario.setRoles(rol.get());
        Usuarios newUsuario = usuarioRepository.save(usuario);
        return ResponseEntity.ok(newUsuario);
    }

    // Actualizar usuario parcialmente
    @PatchMapping("/{id}")
    public ResponseEntity<Usuarios> updateUsuario(@PathVariable Long id, @Valid @RequestBody Usuarios updatedUsuario) {
        return usuarioRepository.findById(id)
            .map(usuario -> {
                if (updatedUsuario.getNombre() != null) {
                    usuario.setNombre(updatedUsuario.getNombre());
                }
                if (updatedUsuario.getApellido() != null) {
                    usuario.setApellido(updatedUsuario.getApellido());
                }
                if (updatedUsuario.getCorreo() != null) {
                    usuario.setCorreo(updatedUsuario.getCorreo());
                }
                if (updatedUsuario.getContrasena() != null) {
                    usuario.setContrasena(updatedUsuario.getContrasena());
                }
                if (updatedUsuario.getRoles() != null) {
                    Optional<Roles> rol = rolesRepository.findById(updatedUsuario.getRoles().getId());
                    if (rol.isPresent()) {
                        usuario.setRoles(rol.get());
                    }
                }
                if (updatedUsuario.getFechaNacimiento() != null) {
                    usuario.setFechaNacimiento(updatedUsuario.getFechaNacimiento());
                }
                Usuarios savedUsuario = usuarioRepository.save(usuario);
                return ResponseEntity.ok(savedUsuario);
            })
            .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Eliminar usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsuario(@PathVariable Long id) {
        if (usuarioRepository.existsById(id)) {
            usuarioRepository.deleteById(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}