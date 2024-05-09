package com.adrinilo.farmagenda.services;

import com.adrinilo.farmagenda.dto.TratamientoDTO;
import com.adrinilo.farmagenda.entities.TratamientoId;

import java.util.List;

public interface TratamientoService {

    public TratamientoDTO createTratamiento(TratamientoDTO tratamientoDTO);

    public List<TratamientoDTO> getAllTratamientos();

    public TratamientoDTO getTratamientoById(TratamientoId id);

    public List<TratamientoDTO> getTratamientosByIdpaciente(String id);

    public TratamientoDTO updateTratamiento(TratamientoDTO tratamientoDTO, TratamientoId id);

    public void deleteTratamiento(TratamientoId id);

}
