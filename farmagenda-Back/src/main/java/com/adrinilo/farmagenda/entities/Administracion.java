package com.adrinilo.farmagenda.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;

@Entity
@Table(name = "administracion", schema = "farmagendadb")
public class Administracion {
    @EmbeddedId
    private AdministracionId id;

    @MapsId("idadmin")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idadmin", nullable = false)
    private Persona idadmin;

    @MapsId("idpaciente")
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "idpaciente", nullable = false)
    private Persona idpaciente;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "rol", nullable = false)
    private Role rol;

    public AdministracionId getId() {
        return id;
    }

    public void setId(AdministracionId id) {
        this.id = id;
    }

    public Persona getIdadmin() {
        return idadmin;
    }

    public void setIdadmin(Persona idadmin) {
        this.idadmin = idadmin;
    }

    public Persona getIdpaciente() {
        return idpaciente;
    }

    public void setIdpaciente(Persona idpaciente) {
        this.idpaciente = idpaciente;
    }

    public Role getRol() {
        return rol;
    }

    public void setRol(Role rol) {
        this.rol = rol;
    }

}