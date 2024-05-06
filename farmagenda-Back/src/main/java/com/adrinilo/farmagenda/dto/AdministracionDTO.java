package com.adrinilo.farmagenda.dto;

import com.adrinilo.farmagenda.entities.AdministracionId;
import com.adrinilo.farmagenda.entities.Role;
import jakarta.validation.constraints.NotNull;

import java.io.Serializable;

public class AdministracionDTO implements Serializable {
    private AdministracionId id;
    private PersonaDTO idadmin;
    private PersonaDTO idpaciente;
    @NotNull
    private Role rol;

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

    public Role getRol() {
        return rol;
    }

    public void setRol(Role rol) {
        this.rol = rol;
    }
}