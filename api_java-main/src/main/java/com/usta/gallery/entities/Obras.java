package com.usta.gallery.entities;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
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
@Table(name = "obras")
public class Obras {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_obra", nullable = false)
    private Long id;

    @Column(name = "titulo", nullable = false, length = Integer.MAX_VALUE)
    private String titulo;

    @Column(name = "descripcion", length = Integer.MAX_VALUE)
    private String descripcion;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name = "año_creacion")
    private LocalDate añoCreacion;

    @Column(name = "imagen", length = Integer.MAX_VALUE)
    private String imagen;

    @Column(name = "tecnica", length = Integer.MAX_VALUE)
    private String tecnica;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuarios idUsuario;

    @ManyToOne(fetch = FetchType.EAGER, optional = false)
    @JoinColumn(name = "id_tipo", nullable = false)
    private TipoObra tipo;
}