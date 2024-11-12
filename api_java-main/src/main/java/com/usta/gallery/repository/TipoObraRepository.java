package com.usta.gallery.repository;

import com.usta.gallery.entities.TipoObra;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoObraRepository extends JpaRepository<TipoObra, Long> {
}