package com.usta.gallery.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.usta.gallery.entities.Roles;
import com.usta.gallery.repository.RolRepository;

@RestController
@RequestMapping("/api/roles")
public class RolController {

  @Autowired
  private RolRepository rolRepository;

  @GetMapping
  public ResponseEntity<Iterable<Roles>> getAllRoles() {
    return ResponseEntity.ok(rolRepository.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Roles> getRolById(@PathVariable Long id) {
    Optional<Roles> rol = rolRepository.findById(id);
    return rol.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  public ResponseEntity<Roles> createRol(@RequestBody Roles rol) {
    Roles newRol = rolRepository.save(rol);
    return ResponseEntity.status(HttpStatus.CREATED).body(newRol);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<Roles> updateRol(@PathVariable Long id, @RequestBody Roles updatedRol) {
    return rolRepository.findById(id)
        .map(rol -> {
          if (updatedRol.getRol() != null) {
            rol.setRol(updatedRol.getRol());
          }
          Roles savedRol = rolRepository.save(rol);
          return ResponseEntity.ok(savedRol);
        })
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteRol(@PathVariable Long id) {
    if (rolRepository.existsById(id)) {
      rolRepository.deleteById(id);
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.notFound().build();
  }
}
