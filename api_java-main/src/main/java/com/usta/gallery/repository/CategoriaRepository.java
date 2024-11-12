package com.usta.gallery.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.usta.gallery.entities.Categorias;

public interface CategoriaRepository extends JpaRepository<Categorias, Long> {
  
}