package com.adrinilo.farmagenda.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import java.io.Serializable;

public class PersonaDTO implements Serializable {
    private String id;
    @NotEmpty
    @Size(max = 10, message = "El nombre no puede tener más de 10 caracteres")
    private String nombre;
    @Size(max = 9,min = 9, message = "El telefono tiene que tener 9 numeros")
    private String telefono;
    @Size(max = 255)
    private String email;

    public PersonaDTO() {
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
