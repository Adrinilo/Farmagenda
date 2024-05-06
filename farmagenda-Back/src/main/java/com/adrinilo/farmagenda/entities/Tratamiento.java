package com.adrinilo.farmagenda.entities;

import jakarta.persistence.*;

import java.time.LocalTime;

@Entity
@Table(name = "tratamientos", schema = "farmagendadb")
public class Tratamiento {
    @EmbeddedId
    private TratamientoId id;

    @MapsId("idpaciente")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idpaciente", nullable = false)
    private Persona idpaciente;

    @Column(name = "intervalodiario")
    private Integer intervalodiario;

    @Column(name = "primeratoma")
    private LocalTime primeratoma;

    public TratamientoId getId() {
        return id;
    }

    public void setId(TratamientoId id) {
        this.id = id;
    }

    public Persona getIdpaciente() {
        return idpaciente;
    }

    public void setIdpaciente(Persona idpaciente) {
        this.idpaciente = idpaciente;
    }

    public Integer getIntervalodiario() {
        return intervalodiario;
    }

    public void setIntervalodiario(Integer intervalodiario) {
        this.intervalodiario = intervalodiario;
    }

    public LocalTime getPrimeratoma() {
        return primeratoma;
    }

    public void setPrimeratoma(LocalTime primeratoma) {
        this.primeratoma = primeratoma;
    }

}