package com.usta.gallery.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.usta.gallery.entities.TipoObra;
import com.usta.gallery.repository.TipoObraRepository;

import java.util.Optional;

@RestController
@RequestMapping("/api/tipos")
public class TipoObraController {

    @Autowired
    private TipoObraRepository tipoObraRepository;

    @GetMapping
    public ResponseEntity<Iterable<TipoObra>> getAllTipos() {
        return ResponseEntity.ok(tipoObraRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<TipoObra> getTipoById(@PathVariable Long id) {
        Optional<TipoObra> tipo = tipoObraRepository.findById(id);
        return tipo.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<TipoObra> createTipo(@RequestBody TipoObra tipoObra) {
        TipoObra newTipo = tipoObraRepository.save(tipoObra);
        return ResponseEntity.ok(newTipo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<TipoObra> updateTipo(@PathVariable Long id, @RequestBody TipoObra tipoObraDetails) {
        Optional<TipoObra> optionalTipo = tipoObraRepository.findById(id);
        if (!optionalTipo.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        TipoObra tipoObra = optionalTipo.get();
        tipoObra.setNombre(tipoObraDetails.getNombre());
        TipoObra updatedTipo = tipoObraRepository.save(tipoObra);
        return ResponseEntity.ok(updatedTipo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTipo(@PathVariable Long id) {
        Optional<TipoObra> optionalTipo = tipoObraRepository.findById(id);
        if (!optionalTipo.isPresent()) {
            return ResponseEntity.notFound().build();
        }
        tipoObraRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}