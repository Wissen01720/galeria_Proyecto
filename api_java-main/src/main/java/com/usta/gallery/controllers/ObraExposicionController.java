package com.usta.gallery.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.usta.gallery.entities.ObrasExposiciones;
import com.usta.gallery.repository.ObraExposicionRepository;

@RestController
@RequestMapping("/api/obrasExposiciones")
public class ObraExposicionController {
  
  @Autowired
  private ObraExposicionRepository obraExposicionRepository;

  @GetMapping
  public ResponseEntity<Iterable<ObrasExposiciones>> getAllObrasExposiciones() {
    return ResponseEntity.ok(obraExposicionRepository.findAll());
  }
}
