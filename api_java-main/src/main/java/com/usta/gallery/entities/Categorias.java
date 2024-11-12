package com.usta.gallery.entities;

import java.util.LinkedHashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "categorias")
public class Categorias {
	@Id	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_categoria", nullable = false)
	private Long id;
	
	@Column(name = "categoria", nullable = false, length = Integer.MAX_VALUE)
	private String categoria;
	
	@OneToMany(mappedBy = "idCategoria")
	private Set<Exposiciones> exposiciones = new LinkedHashSet<>();
	
}