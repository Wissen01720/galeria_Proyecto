package com.usta.gallery.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.usta.gallery.entities.Categorias;
import com.usta.gallery.repository.CategoriaRepository;

@RestController
@RequestMapping("/api/categorias")
@CrossOrigin(origins = "http://localhost:5173")
public class CategoriaController {

  @Autowired
  private CategoriaRepository categoriaRepository;

  @GetMapping
  public ResponseEntity<Iterable<Categorias>> getAllCategorias() {
    return ResponseEntity.ok(categoriaRepository.findAll());
  }

  @GetMapping("/{id}")
  public ResponseEntity<Categorias> getCategoriaById(@PathVariable Long id) {
    Optional<Categorias> categoria = categoriaRepository.findById(id);
    return categoria.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
  }

  @PostMapping
  public ResponseEntity<Categorias> createCategoria(@RequestBody Categorias categoria) {
    Categorias newCategoria = categoriaRepository.save(categoria);
    return ResponseEntity.status(HttpStatus.CREATED).body(newCategoria);
  }

  @PatchMapping("/{id}")
  public ResponseEntity<Categorias> updateCategoria(@PathVariable Long id, @RequestBody Categorias updatedCategoria) {
    return categoriaRepository.findById(id)
        .map(categoria -> {
          if (updatedCategoria.getCategoria() != null) {
            categoria.setCategoria(updatedCategoria.getCategoria());
          }
          Categorias savedCategoria = categoriaRepository.save(categoria);
          return ResponseEntity.ok(savedCategoria);
        })
        .orElseGet(() -> ResponseEntity.notFound().build());
  }

  @DeleteMapping("/{id}")
  public ResponseEntity<Void> deleteCategoria(@PathVariable Long id) {
    if (categoriaRepository.existsById(id)) {
      categoriaRepository.deleteById(id);
      return ResponseEntity.noContent().build();
    }
    return ResponseEntity.notFound().build();
  }

}
