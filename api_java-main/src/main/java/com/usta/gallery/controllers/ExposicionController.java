package com.usta.gallery.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.usta.gallery.entities.Exposiciones;
import com.usta.gallery.repository.ExposicionRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/exposiciones")
@CrossOrigin(origins = "http://localhost:5173")
public class ExposicionController {
  
  @Autowired
  private ExposicionRepository exposicionRepository;

  // Obtener todas las exposiciones
  @GetMapping
  public ResponseEntity<?> getAllExposiciones() {
    try {
      List<Exposiciones> exposiciones = exposicionRepository.findAll();
      return ResponseEntity.ok(exposiciones);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                           .body(new ErrorResponse("Error al obtener las exposiciones: " + e.getMessage()));
    }
  }

  // Obtener exposición por ID
  @GetMapping("/{id}")
  public ResponseEntity<?> getExposicionById(@PathVariable Long id) {
    try {
      Optional<Exposiciones> exposicion = exposicionRepository.findById(id);
      if (exposicion.isPresent()) {
        return ResponseEntity.ok(exposicion.get());
      } else {
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
                             .body(new ErrorResponse("Exposición no encontrada"));
      }
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                           .body(new ErrorResponse("Error al obtener la exposición: " + e.getMessage()));
    }
  }

  // Obtener exposiciones por categoría ID
  @GetMapping("/categorias/{id}")
  public ResponseEntity<?> getExposicionesByCategoriaId(@PathVariable Long id) {
    try {
      List<Exposiciones> exposiciones = exposicionRepository.findByCategoriaId(id);
      return ResponseEntity.ok(exposiciones);
    } catch (Exception e) {
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                           .body(new ErrorResponse("Error al obtener las exposiciones por categoría: " + e.getMessage()));
    }
  }

  // Crear una nueva exposición
  @PostMapping
  public ResponseEntity<?> createExposicion(@Valid @RequestBody Exposiciones exposicion) {
    if (exposicion.getTitulo() == null || exposicion.getTitulo().isEmpty()) {
      return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                           .body(new ErrorResponse("El título es obligatorio"));
    }
    
    try {
      Exposiciones savedExposicion = exposicionRepository.save(exposicion);
      return ResponseEntity.ok(savedExposicion);
    } catch (Exception e) {
      e.printStackTrace(); // Imprime la traza del error en los registros del servidor
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                           .body(new ErrorResponse("Error al guardar la exposición: " + e.getMessage()));
    }
  }

  // Clase para representar la respuesta de error
  public static class ErrorResponse {
    private String message;

    public ErrorResponse(String message) {
      this.message = message;
    }

    public String getMessage() {
      return message;
    }
  }
}