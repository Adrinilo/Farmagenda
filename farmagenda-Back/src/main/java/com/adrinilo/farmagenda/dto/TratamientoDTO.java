package com.adrinilo.farmagenda.dto;

import com.adrinilo.farmagenda.entities.TratamientoId;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.time.LocalTime;

public class TratamientoDTO implements Serializable {
    private TratamientoId id;
    private Integer intervalodiario;
    private LocalTime primeratoma;

    public TratamientoDTO() {
    }

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
        return "TratamientoDTO{" +
                "id=" + id +
                ", intervalodiario=" + intervalodiario +
                ", primeratoma=" + primeratoma +
                '}';
    }
}
