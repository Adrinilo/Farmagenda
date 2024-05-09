package com.adrinilo.farmagenda.repositories;

import com.adrinilo.farmagenda.entities.Tratamiento;
import com.adrinilo.farmagenda.entities.TratamientoId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalTime;
import java.util.List;

//@Transactional
public interface TratamientoRepository extends JpaRepository<Tratamiento, TratamientoId> {

    /*@Modifying
    @Query(value = "INSERT INTO tratamientos (idpaciente, idmedicamento, intervalodiario, primeratoma) VALUES (:idpaciente, :idmedicamento, :intervalodiario, :primeratoma)", nativeQuery = true)
    void createTratamiento(@Param("idpaciente") String idpaciente, @Param("idmedicamento") Long idmedicamento, @Param("intervalodiario") int intervalodiario, @Param("primeratoma") LocalTime primeratoma);*/

    List<Tratamiento> findById_Idpaciente(String idpaciente);
}
