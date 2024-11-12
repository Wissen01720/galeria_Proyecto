package com.usta.gallery.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "tecnicas")
public class Tecnicas {
	@Id	
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id_tecnica", nullable = false)
	private Long id;

	@Column(name = "tecnica", nullable = false, length = Integer.MAX_VALUE)
	private String tecnica;

}