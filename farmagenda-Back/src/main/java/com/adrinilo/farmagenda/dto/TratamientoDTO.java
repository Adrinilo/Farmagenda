package com.adrinilo.farmagenda.dto;

import com.adrinilo.farmagenda.entities.TratamientoId;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.time.LocalTime;

public class TratamientoDTO implements Serializable {
    private TratamientoId id;
    private String pacienteNombre;
    @NotNull
    private Integer intervaloDiario;
    @NotNull
    private LocalTime primeraToma;

    public TratamientoDTO() {
    }

    public TratamientoId getId() {
        return id;
    }

    public void setId(TratamientoId id) {
        this.id = id;
    }

    public String getPacienteNombre() {
        return pacienteNombre;
    }

    public void setPacienteNombre(String pacienteNombre) {
        this.pacienteNombre = pacienteNombre;
    }

    public Integer getIntervaloDiario() {
        return intervaloDiario;
    }

    public void setIntervaloDiario(Integer intervaloDiario) {
        this.intervaloDiario = intervaloDiario;
    }

    public LocalTime getPrimeraToma() {
        return primeraToma;
    }

    public void setPrimeraToma(LocalTime primeraToma) {
        this.primeraToma = primeraToma;
    }
}
