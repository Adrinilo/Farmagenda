package com.adrinilo.farmagenda.entities;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "personas", schema = "farmagendadb")
public class Persona {
    @Id
    @Column(name = "idpersona", nullable = false)
    private String id;

    @Size(max = 30)
    @NotNull
    @Column(name = "nombre", nullable = false, length = 30)
    private String nombre;

    @Size(max = 9)
    @Column(name = "telefono", length = 9)
    private String telefono;

    @Size(max = 255)
    @Column(name = "email")
    private String email;

    @OneToMany(mappedBy = "idadmin")
    private List<Administracion> administradores = new ArrayList<>();

    @OneToMany(mappedBy = "id.idpaciente")
    private List<Tratamiento> tratamientos = new ArrayList<>();

    public List<Tratamiento> getTratamientos() {
        return tratamientos;
    }

    public void setTratamientos(List<Tratamiento> tratamientos) {
        this.tratamientos = tratamientos;
    }

    public List<Administracion> getAdministradores() {
        return administradores;
    }

    public void setAdministradores(List<Administracion> administradores) {
        this.administradores = administradores;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getTelefono() {
        return telefono;
    }

    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}