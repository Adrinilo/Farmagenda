package com.adrinilo.farmagenda.entities;

import jakarta.persistence.*;

import java.time.LocalTime;

@Entity
@Table(name = "tratamientos", schema = "farmagendadb")
public class Tratamiento {
    @EmbeddedId
    private TratamientoId id;

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

    @Override
    public String toString() {
        return "Tratamiento{" +
                "id=" + id +
                ", intervalodiario=" + intervalodiario +
                ", primeratoma=" + primeratoma +
                '}';
    }
}