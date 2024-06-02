package com.adrinilo.farmagenda.repositories;

import com.adrinilo.farmagenda.entities.Tratamiento;
import com.adrinilo.farmagenda.entities.TratamientoId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalTime;
import java.util.List;

//@Transactional
public interface TratamientoRepository extends JpaRepository<Tratamiento, TratamientoId> {

    List<Tratamiento> findById_Idpaciente(String idpaciente);
}
