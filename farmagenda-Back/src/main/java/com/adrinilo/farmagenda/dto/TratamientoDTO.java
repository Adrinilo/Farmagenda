package com.adrinilo.farmagenda.dto;

import com.adrinilo.farmagenda.entities.TratamientoId;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;
import java.time.LocalTime;

public class TratamientoDTO implements Serializable {
    private TratamientoId id;
    private Integer tomasDiarias;
    private LocalTime primeratoma;

    public TratamientoDTO() {
    }

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
}
