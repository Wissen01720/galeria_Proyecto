package com.usta.gallery.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.usta.gallery.entities.Tecnicas;

public interface TecnicaRepository extends JpaRepository<Tecnicas, Long> {
  
}
