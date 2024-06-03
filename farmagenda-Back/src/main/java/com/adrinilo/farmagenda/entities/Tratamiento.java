package com.adrinilo.farmagenda.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.Size;

import java.time.LocalTime;

@Entity
@Table(name = "tratamientos", schema = "farmagendadb")
public class Tratamiento {
    @EmbeddedId
    private TratamientoId id;

    @Column(name = "tomasdiarias")
    private Integer tomasDiarias;

    @Column(name = "primeratoma")
    private LocalTime primeratoma;

    @Column(name = "notas")
    private String notas;

    @Size(max = 6)
    @Column(name = "color")
    private String color;

    public TratamientoId getId() {
        return id;
    }

    public void setId(TratamientoId id) {
        this.id = id;
    }

    public Integer getTomasDiarias() {
        return tomasDiarias;
    }

    public void setTomasDiarias(Integer tomasDiarias) {
        this.tomasDiarias = tomasDiarias;
    }

    public LocalTime getPrimeratoma() {
        return primeratoma;
    }

    public void setPrimeratoma(LocalTime primeratoma) {
        this.primeratoma = primeratoma;
    }

    public String getNotas() {
        return notas;
    }

    public void setNotas(String notas) {
        this.notas = notas;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }
}