package com.usta.gallery.controllers;

import com.usta.gallery.entities.Obras;
import com.usta.gallery.repository.ObraRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/obras")
public class ObrasController {

    @Autowired
    private ObraRepository obrasRepository;

    @GetMapping
    public List<Obras> getAllObras() {
        return obrasRepository.findAll();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Obras> getObraById(@PathVariable Long id) {
        Obras obra = obrasRepository.findById(id).orElse(null);
        if (obra == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(obra);
    }

    @PostMapping(consumes = "multipart/form-data")  // Aceptar multipart
    public ResponseEntity<Obras> createObra(@RequestParam("titulo") String titulo,
                                            @RequestParam("descripcion") String descripcion,
                                            @RequestParam("añoCreacion") int añoCreacion,
                                            @RequestParam("file") MultipartFile file) throws IOException {
        LocalDate fechaCreacion = LocalDate.of(añoCreacion, 1, 1);  // Asume el 1 de enero como fecha de creación
        
        // Procesar el archivo (guardar la imagen, etc.)
        String imagenUrl = saveFile(file);

        // Crear una nueva obra
        Obras nuevaObra = new Obras();
        nuevaObra.setTitulo(titulo);
        nuevaObra.setDescripcion(descripcion);
        nuevaObra.setAñoCreacion(fechaCreacion);  // Asignar el LocalDate al campo añoCreacion
        nuevaObra.setImagen(imagenUrl);  // Guardar la URL de la imagen en la base de datos

        Obras obraGuardada = obrasRepository.save(nuevaObra);
        return ResponseEntity.ok(obraGuardada);
    }


    // Método para guardar el archivo
    private String saveFile(MultipartFile file) throws IOException {
        // Aquí guardas el archivo y devuelves la URL o ruta de la imagen guardada
        // Esto dependerá de cómo desees almacenar el archivo (en un servidor o en una base de datos, por ejemplo)
        
        // Ejemplo de guardar el archivo localmente
        String filePath = "path/to/save/" + file.getOriginalFilename();
        file.transferTo(new java.io.File(filePath));
        
        return filePath;  // Retornar la URL o ruta donde se guardó el archivo
    }

    @PutMapping("/{id}")
    public ResponseEntity<Obras> updateObra(@PathVariable Long id, @RequestBody Obras obraDetails) {
        Obras obra = obrasRepository.findById(id).orElse(null);
        if (obra == null) {
            return ResponseEntity.notFound().build();
        }
        obra.setTitulo(obraDetails.getTitulo());
        obra.setDescripcion(obraDetails.getDescripcion());
        obra.setAñoCreacion(obraDetails.getAñoCreacion());
        obra.setImagen(obraDetails.getImagen());
        obra.setIdUsuario(obraDetails.getIdUsuario());
        obra.setIdRol(obraDetails.getIdRol());
        obra.setIdTecnica(obraDetails.getIdTecnica());
        obra.setTipo(obraDetails.getTipo());
        Obras updatedObra = obrasRepository.save(obra);
        return ResponseEntity.ok(updatedObra);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteObra(@PathVariable Long id) {
        Obras obra = obrasRepository.findById(id).orElse(null);
        if (obra == null) {
            return ResponseEntity.notFound().build();
        }
        obrasRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
