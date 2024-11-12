package com.usta.gallery.repository;

import com.usta.gallery.entities.Obras;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ObraRepository extends JpaRepository<Obras, Long> {
}