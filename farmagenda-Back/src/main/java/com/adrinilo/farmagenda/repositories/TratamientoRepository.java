package com.adrinilo.farmagenda.repositories;

import com.adrinilo.farmagenda.entities.Administracion;
import com.adrinilo.farmagenda.entities.Tratamiento;
import com.adrinilo.farmagenda.entities.TratamientoId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TratamientoRepository extends JpaRepository<Tratamiento, TratamientoId> {

    List<Tratamiento> findById_Idpaciente(Long idpaciente);
}
