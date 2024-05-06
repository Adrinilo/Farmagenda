package com.adrinilo.farmagenda.services;

import com.adrinilo.farmagenda.dto.AdministracionDTO;
import com.adrinilo.farmagenda.dto.TratamientoDTO;

import com.adrinilo.farmagenda.entities.Administracion;
import com.adrinilo.farmagenda.entities.Persona;
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
        Tratamiento tratamiento = mapearEntidad(tratamientoDTO);
        Tratamiento newTratamiento = tratamientoRepository.save(tratamiento);
        return mapearDTO(newTratamiento);
    }

    @Override
    public List<TratamientoDTO> getAllTratamientos() {
        List<Tratamiento> listTratamientos = tratamientoRepository.findAll();
        List<TratamientoDTO> tramientos = listTratamientos.stream().map(tratamiento -> mapearDTO(tratamiento))
                .collect(Collectors.toList());

        return tramientos;
    }

    @Override
    public TratamientoDTO getTratamientoById(TratamientoId id) {
        Tratamiento tratamiento = tratamientoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tratamiento", "id", id.toString()));
        return mapearDTO(tratamiento);
    }

    @Override
    public List<TratamientoDTO> getTratamientosByIdpaciente(Long id) {
        List<Tratamiento> listTratamientos = tratamientoRepository.findById_Idpaciente(id);
        List<TratamientoDTO> tratamientos = listTratamientos.stream().map(tratamiento -> mapearDTO(tratamiento))
                .collect(Collectors.toList());
        return tratamientos;
    }

    @Override
    public TratamientoDTO updateTratamiento(TratamientoDTO tratamientoDTO, TratamientoId id) {
        Tratamiento tratamiento = tratamientoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tratamiento", "id", id.toString()));

        Persona persona = personaRepository.findById(tratamientoDTO.getId().getIdpaciente())
                .orElseThrow(() -> new ResourceNotFoundException("Paciente", "id", tratamientoDTO.getId().getIdpaciente().toString()));

        tratamiento.setIdpaciente(persona);
        tratamiento.setIntervalodiario(tratamientoDTO.getIntervaloDiario());
        tratamiento.setPrimeratoma(tratamientoDTO.getPrimeraToma());

        Tratamiento tratamientoUpdated = tratamientoRepository.save(tratamiento);
        return mapearDTO(tratamientoUpdated);
    }

    @Override
    public void deleteTratamiento(TratamientoId id) {
        Tratamiento tratamiento = tratamientoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Tratamiento", "id", id.toString()));
        tratamientoRepository.delete(tratamiento);
    }

    // Convierte entidad a DTO
    private TratamientoDTO mapearDTO(Tratamiento tratamiento) {
        TratamientoDTO tratamientoDTO = modelMapper.map(tratamiento, TratamientoDTO.class);
        tratamientoDTO.setPacienteNombre(tratamiento.getIdpaciente().getNombre());
        return tratamientoDTO;
    }

    // Convierte de DTO a Entidad
    private Tratamiento mapearEntidad(TratamientoDTO tratamientoDTO) {
        Tratamiento tratamiento = modelMapper.map(tratamientoDTO, Tratamiento.class);
        tratamiento.setId(new TratamientoId(tratamientoDTO.getId().getIdpaciente(), tratamientoDTO.getId().getIdmedicamento()));
        return tratamiento;
    }
}
