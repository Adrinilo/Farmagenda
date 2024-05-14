package com.adrinilo.farmagenda.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class TratamientoId implements Serializable {
    private static final long serialVersionUID = 6407047049258092540L;
    @NotNull
    @Column(name = "idpaciente", nullable = false)
    private String idpaciente;

    @NotNull
    @Column(name = "idmedicamento", nullable = false)
    private Long idmedicamento;

    public TratamientoId() {
    }

    public String getIdpaciente() {
        return idpaciente;
    }

    public void setIdpaciente(String idpaciente) {
        this.idpaciente = idpaciente;
    }

    public Long getIdmedicamento() {
        return idmedicamento;
    }

    public void setIdmedicamento(Long idmedicamento) {
        this.idmedicamento = idmedicamento;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        TratamientoId entity = (TratamientoId) o;
        return Objects.equals(this.idmedicamento, entity.idmedicamento) &&
                Objects.equals(this.idpaciente, entity.idpaciente);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idmedicamento, idpaciente);
    }
}