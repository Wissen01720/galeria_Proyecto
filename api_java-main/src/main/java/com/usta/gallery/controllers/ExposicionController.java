package com.usta.gallery.controllers;

import java.util.Collections;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.usta.gallery.entities.Exposiciones;
import com.usta.gallery.repository.ExposicionRepository;

@RestController
@RequestMapping("/api/exposiciones")
public class ExposicionController {
  
  @Autowired
  private ExposicionRepository exposicionRepository;

  @GetMapping
  public ResponseEntity<Iterable<Exposiciones>> getAllExposiciones() {
    return ResponseEntity.ok(exposicionRepository.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Exposiciones> getExposicionById(@PathVariable Long id) {
    Optional<Exposiciones> exposicion = exposicionRepository.findById(id);
    return exposicion.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @GetMapping("/categorias/{id}")
  public ResponseEntity<Iterable<Exposiciones>> getExposicionesByCategoriaId(@PathVariable Long id) {
    return ResponseEntity.ok(exposicionRepository.findAllById(Collections.singletonList(id)));
  }
}
