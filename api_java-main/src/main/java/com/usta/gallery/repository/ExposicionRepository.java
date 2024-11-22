package com.usta.gallery.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.usta.gallery.entities.Exposiciones;
import java.util.List;

public interface ExposicionRepository extends JpaRepository<Exposiciones, Long> {
    List<Exposiciones> findByCategoriaId(Long id);
}