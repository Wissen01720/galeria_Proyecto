package com.usta.gallery.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.usta.gallery.entities.Exposiciones;

public interface ExposicionRepository extends JpaRepository<Exposiciones, Long> {
  
}
