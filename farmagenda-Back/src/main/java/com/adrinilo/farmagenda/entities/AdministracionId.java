package com.adrinilo.farmagenda.entities;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class AdministracionId implements Serializable {
    private static final long serialVersionUID = -7820500851043814111L;
    @NotNull
    @Column(name = "idadmin", nullable = false)
    private Long idadmin;

    @NotNull
    @Column(name = "idpaciente", nullable = false)
    private Long idpaciente;

    public AdministracionId() {
    }

    public AdministracionId(Long idadmin, Long idpaciente) {
    }

    public Long getIdadmin() {
        return idadmin;
    }

    public void setIdadmin(Long idadmin) {
        this.idadmin = idadmin;
    }

    public Long getIdpaciente() {
        return idpaciente;
    }

    public void setIdpaciente(Long idpaciente) {
        this.idpaciente = idpaciente;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        AdministracionId entity = (AdministracionId) o;
        return Objects.equals(this.idadmin, entity.idadmin) &&
                Objects.equals(this.idpaciente, entity.idpaciente);
    }

    @Override
    public int hashCode() {
        return Objects.hash(idadmin, idpaciente);
    }

}