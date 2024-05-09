package com.adrinilo.farmagenda.repositories;

import com.adrinilo.farmagenda.entities.Persona;
import org.springframework.data.jpa.repository.JpaRepository;
public interface PersonaRepository extends JpaRepository<Persona, String> {
}
