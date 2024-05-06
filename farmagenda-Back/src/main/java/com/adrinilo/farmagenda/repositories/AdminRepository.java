package com.adrinilo.farmagenda.repositories;

import com.adrinilo.farmagenda.entities.Administracion;
import com.adrinilo.farmagenda.entities.AdministracionId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdminRepository extends JpaRepository<Administracion, AdministracionId> {
    List<Administracion> findById_Idpaciente(Long idpaciente);
}
