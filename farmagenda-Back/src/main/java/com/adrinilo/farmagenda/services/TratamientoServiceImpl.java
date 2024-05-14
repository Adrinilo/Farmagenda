package com.adrinilo.farmagenda.services;

import com.adrinilo.farmagenda.dto.TratamientoDTO;

import com.adrinilo.farmagenda.entities.Tratamiento;
import com.adrinilo.farmagenda.entities.TratamientoId;
import com.adrinilo.farmagenda.exceptions.ResourceNotFoundException;

import com.adrinilo.farmagenda.repositories.PersonaRepository;
import com.adrinilo.farmagenda.repositories.TratamientoRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TratamientoServiceImpl implements TratamientoService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private TratamientoRepository tratamientoRepository;

    @Autowired
    private PersonaRepository personaRepository;

    @Override
    public TratamientoDTO createTratamiento(TratamientoDTO tratamientoDTO) {
        //System.out.println(tratamientoDTO.getId().getIdpaciente());
        //System.out.println(tratamientoDTO.getId().getIdmedicamento());
        Tratamiento tratamiento = mapearEntidad(tratamientoDTO);
        //System.out.println(tratamiento.toString());
        //System.out.println(tratamiento.getId().getIdpaciente());
        //System.out.println(tratamiento.getId().getIdmedicamento());
        //tratamientoRepository.createTratamiento(tratamiento.getId().getIdpaciente(), tratamiento.getId().getIdmedicamento(), tratamiento.getIntervalodiario(), tratamiento.getPrimeratoma());
        Tratamiento newTratamiento = tratamientoRepository.save(tratamiento);
        return mapearDTO(newTratamiento);
    }

    @Override
    public List<TratamientoDTO> getAllTratamientos() {
        List<Tratamiento> listTratamientos = tratamientoRepository.findAll();
        List<TratamientoDTO> tratamientos = listTratamientos.stream().map(tratamiento -> mapearDTO(tratamiento))
                .collect(Collectors.toList());

        return tratamientos;
    }

    @Override
    public TratamientoDTO getTratamientoById(TratamientoId id) {
        Tratamiento tratamiento = tratamientoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tratamiento", "id", id.toString()));
        return mapearDTO(tratamiento);
    }

    @Override
    public List<TratamientoDTO> getTratamientosByIdpaciente(String id) {
        List<Tratamiento> listTratamientos = tratamientoRepository.findById_Idpaciente(id);
        List<TratamientoDTO> tratamientos = listTratamientos.stream().map(tratamiento -> mapearDTO(tratamiento))
                .collect(Collectors.toList());
        return tratamientos;
    }

    @Override
    public TratamientoDTO updateTratamiento(TratamientoDTO tratamientoDTO, TratamientoId id) {
        Tratamiento tratamiento = tratamientoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tratamiento", "id", id.toString()));

        tratamiento.setTomasDiarias(tratamientoDTO.getTomasDiarias());
        tratamiento.setPrimeratoma(tratamientoDTO.getPrimeratoma());

        Tratamiento tratamientoUpdated = tratamientoRepository.save(tratamiento);
        return mapearDTO(tratamientoUpdated);
    }

    @Override
    public void deleteTratamiento(TratamientoId id) {
        System.out.println(id.toString());
        Tratamiento tratamiento = tratamientoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tratamiento", "id", id.toString()));
        tratamientoRepository.delete(tratamiento);
    }

    // Convierte entidad a DTO
    private TratamientoDTO mapearDTO(Tratamiento tratamiento) {
        TratamientoDTO tratamientoDTO = modelMapper.map(tratamiento, TratamientoDTO.class);
        return tratamientoDTO;
    }

    // Convierte de DTO a Entidad
    private Tratamiento mapearEntidad(TratamientoDTO tratamientoDTO) {
        Tratamiento tratamiento = modelMapper.map(tratamientoDTO, Tratamiento.class);
        TratamientoId id = new TratamientoId();
        id.setIdpaciente(tratamientoDTO.getId().getIdpaciente());
        id.setIdmedicamento(tratamientoDTO.getId().getIdmedicamento());
        tratamiento.setId(id);
        return tratamiento;
    }
}
