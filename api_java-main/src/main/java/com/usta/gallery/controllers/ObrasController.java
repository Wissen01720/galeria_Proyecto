package com.usta.gallery.controllers;

import com.usta.gallery.entities.*;
import com.usta.gallery.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/obras")
public class ObrasController {

    @Autowired
    private ObraRepository obrasRepository;

    @Autowired
    private TipoObraRepository tipoObraRepository;

    @Autowired
    private UsuariosRepository usuariosRepository;

    // Obtener todas las obras
    @GetMapping
    public ResponseEntity<List<Obras>> getAllObras() {
        return ResponseEntity.ok(obrasRepository.findAll());
    }

    // Obtener una obra por ID
    @GetMapping("/{id}")
    public ResponseEntity<Obras> getObraById(@PathVariable Long id) {
        return obrasRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Crear una nueva obra
    @PostMapping(consumes = "application/json")
    public ResponseEntity<?> createObra(@RequestBody Obras nuevaObra) {
        try {
            // Validar entidades relacionadas
            if (nuevaObra.getTipo() == null || nuevaObra.getTipo().getId() == null) {
                return ResponseEntity.badRequest().body("Tipo de obra no válido");
            }
            TipoObra tipoObra = tipoObraRepository.findById(nuevaObra.getTipo().getId())
                    .orElse(null);
            if (tipoObra == null) {
                return ResponseEntity.badRequest().body("Tipo de obra no válido");
            }

            if (nuevaObra.getIdUsuario() == null || nuevaObra.getIdUsuario().getId() == null) {
                return ResponseEntity.badRequest().body("Usuario no válido");
            }
            Usuarios usuario = usuariosRepository.findById(nuevaObra.getIdUsuario().getId())
                    .orElse(null);
            if (usuario == null) {
                return ResponseEntity.badRequest().body("Usuario no válido");
            }

            // Asignar relaciones
            nuevaObra.setTipo(tipoObra);
            nuevaObra.setIdUsuario(usuario);

            // Manejar año de creación (si aplica)
            if (nuevaObra.getAñoCreacion() != null) {
                nuevaObra.setAñoCreacion(LocalDate.of(nuevaObra.getAñoCreacion().getYear(), 1, 1));
            }

            Obras obraGuardada = obrasRepository.save(nuevaObra);
            return ResponseEntity.status(HttpStatus.CREATED).body(obraGuardada);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear la obra");
        }
    }

    // Actualizar una obra existente
    @PutMapping("/{id}")
    public ResponseEntity<?> updateObra(@PathVariable Long id, @RequestBody Obras obraDetails) {
        try {
            Obras obraExistente = obrasRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Obra no encontrada"));

            // Actualizar campos
            obraExistente.setTitulo(obraDetails.getTitulo());
            obraExistente.setDescripcion(obraDetails.getDescripcion());
            obraExistente.setAñoCreacion(obraDetails.getAñoCreacion());
            obraExistente.setImagen(obraDetails.getImagen());
            obraExistente.setTecnica(obraDetails.getTecnica());

            // Actualizar relaciones
            if (obraDetails.getTipo() != null) {
                TipoObra tipoObra = tipoObraRepository.findById(obraDetails.getTipo().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Tipo de obra no válido"));
                obraExistente.setTipo(tipoObra);
            }

            if (obraDetails.getIdUsuario() != null) {
                Usuarios usuario = usuariosRepository.findById(obraDetails.getIdUsuario().getId())
                        .orElseThrow(() -> new IllegalArgumentException("Usuario no válido"));
                obraExistente.setIdUsuario(usuario);
            }

            Obras obraActualizada = obrasRepository.save(obraExistente);
            return ResponseEntity.ok(obraActualizada);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al actualizar la obra");
        }
    }

    // Eliminar una obra
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteObra(@PathVariable Long id) {
        try {
            Obras obraExistente = obrasRepository.findById(id)
                    .orElseThrow(() -> new IllegalArgumentException("Obra no encontrada"));
            obrasRepository.delete(obraExistente);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al eliminar la obra");
        }
    }
}