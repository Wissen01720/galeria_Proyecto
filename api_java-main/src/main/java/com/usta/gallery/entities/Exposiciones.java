package com.usta.gallery.entities;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "exposiciones")
public class Exposiciones {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_exposicion", nullable = false)
	private Long id;

	@Column(name = "titulo", nullable = false, length = Integer.MAX_VALUE)
	private String titulo;

	@Column(name = "descripcion", length = Integer.MAX_VALUE)
	private String descripcion;

	@Column(name = "fecha_inicio")
	private LocalDate fechaInicio;

	@Column(name = "fecha_fin")
	private LocalDate fechaFin;

	@Column(name = "ubicacion", length = Integer.MAX_VALUE)
	private String ubicacion;

	@ManyToOne(fetch = FetchType.EAGER, optional = false)
	@JoinColumn(name = "id_categoria", nullable = false)
	private Categorias idCategoria;

}