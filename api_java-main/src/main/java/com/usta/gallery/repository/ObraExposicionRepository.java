package com.usta.gallery.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.usta.gallery.entities.ObrasExposiciones;

public interface ObraExposicionRepository extends JpaRepository<ObrasExposiciones, Long> {
  
}
