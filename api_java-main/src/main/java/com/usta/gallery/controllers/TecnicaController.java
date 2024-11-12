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

import com.usta.gallery.entities.Tecnicas;
import com.usta.gallery.repository.TecnicaRepository;

@RestController
@RequestMapping("/api/tecnicas")
public class TecnicaController {

  @Autowired
  private TecnicaRepository tecnicaRepository;

  @GetMapping
  public ResponseEntity<Iterable<Tecnicas>> getAllTecnicas() {
    return ResponseEntity.ok(tecnicaRepository.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Tecnicas> getTecnicaById(@PathVariable Long id) {
    Optional<Tecnicas> tecnica = tecnicaRepository.findById(id);
    return tecnica.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  public ResponseEntity<Tecnicas> createTecnica(@RequestBody Tecnicas tecnica) {
    Tecnicas newTecnica = tecnicaRepository.save(tecnica);
    return ResponseEntity.status(HttpStatus.CREATED).body(newTecnica);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<Tecnicas> updateTecnica(@PathVariable Long id, @RequestBody Tecnicas updatedTecnica) {
    return tecnicaRepository.findById(id)
        .map(tecnica -> {
          if (updatedTecnica.getTecnica() != null) {
            tecnica.setTecnica(updatedTecnica.getTecnica());
          }
          Tecnicas savedTecnica = tecnicaRepository.save(tecnica);
          return ResponseEntity.ok(savedTecnica);
        })
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteTecnica(@PathVariable Long id) {
    if (tecnicaRepository.existsById(id)) {
      tecnicaRepository.deleteById(id);
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.notFound().build();
  }

}
