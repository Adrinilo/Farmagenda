package com.adrinilo.farmagenda.dto;

import com.adrinilo.farmagenda.entities.AdministracionId;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;

public class AdministracionDTO implements Serializable {
    private AdministracionId id;
    private PersonaDTO idadmin;
    private PersonaDTO idpaciente;

    public AdministracionDTO() {
    }

    public AdministracionId getId() {
        return id;
    }

    public void setId(AdministracionId id) {
        this.id = id;
    }

    public PersonaDTO getIdadmin() {
        return idadmin;
    }

    public void setIdadmin(PersonaDTO idadmin) {
        this.idadmin = idadmin;
    }

    public PersonaDTO getIdpaciente() {
        return idpaciente;
    }

    public void setIdpaciente(PersonaDTO idpaciente) {
        this.idpaciente = idpaciente;
    }

    @Override
    public String toString() {
        return "AdministracionDTO{" +
                "id=" + id +
                ", idadmin=" + idadmin +
                ", idpaciente=" + idpaciente +
                '}';
    }
}