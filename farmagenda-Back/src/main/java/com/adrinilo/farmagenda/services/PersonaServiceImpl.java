package com.adrinilo.farmagenda.services;

import com.adrinilo.farmagenda.dto.AdministracionDTO;
import com.adrinilo.farmagenda.dto.PersonaDTO;
import com.adrinilo.farmagenda.dto.PersonaResponse;
import com.adrinilo.farmagenda.entities.Administracion;
import com.adrinilo.farmagenda.entities.Persona;
import com.adrinilo.farmagenda.exceptions.ResourceNotFoundException;
import com.adrinilo.farmagenda.repositories.AdminRepository;
import com.adrinilo.farmagenda.repositories.PersonaRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PersonaServiceImpl implements PersonaService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private PersonaRepository personaRepository;

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public PersonaDTO createPersona(PersonaDTO personaDTO) {
        Persona persona = mapearEntidad(personaDTO);

        Persona newPersona = personaRepository.save(persona);

        return mapearDTO(newPersona);
    }

    @Override
    public PersonaResponse getAllPersonas(int pageNum, int itemsPerPage, String orderBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(orderBy).ascending()
                : Sort.by(orderBy).descending();
        Pageable pageable = PageRequest.of(pageNum, itemsPerPage, sort);

        Page<Persona> personas = personaRepository.findAll(pageable);

        List<Persona> listPersonas = personas.getContent();
        List<PersonaDTO> contenido = listPersonas.stream().map(persona -> mapearDTO(persona))
                .collect(Collectors.toList());

        PersonaResponse personaResponse = new PersonaResponse();
        personaResponse.setContenido(contenido);
        personaResponse.setPageNum(personas.getNumber());
        personaResponse.setItemsPerPage(personas.getSize());
        personaResponse.setTotalElements(personas.getTotalElements());
        personaResponse.setTotalPages(personas.getTotalPages());
        personaResponse.setLast(personas.isLast());

        return personaResponse;
    }

    @Override
    public PersonaDTO getPersonaById(String id) {
        Persona persona = personaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Persona", "id", id));
        return mapearDTO(persona);
    }

    @Override
    public List<PersonaDTO> getPersonasACargoById(String id) {
        Persona persona = personaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Persona", "id", id));

        List<Persona> personasACargo = persona.getPersonasACargo();

        List<PersonaDTO> personasACargoDTO = personasACargo.stream().map(paciente -> mapearDTO(paciente))
                .collect(Collectors.toList());

        return personasACargoDTO;
    }

    @Override
    public PersonaDTO updatePersona(PersonaDTO personaDTO, String id) {
        Persona persona = personaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Persona", "id", id));

        persona.setNombre(personaDTO.getNombre());
        persona.setTelefono(personaDTO.getTelefono());
        persona.setEmail(personaDTO.getEmail());

        Persona personaUpdated = personaRepository.save(persona);
        return mapearDTO(personaUpdated);
    }

    @Override
    public void deletePersona(String id) {
        Persona persona = personaRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Persona", "id", id.toString()));
        personaRepository.delete(persona);
    }

    // Convierte entidad a DTO
    private PersonaDTO mapearDTO(Persona persona) {
        PersonaDTO personaDTO = modelMapper.map(persona, PersonaDTO.class);
        return personaDTO;
    }

    // Convierte de DTO a Entidad
    private Persona mapearEntidad(PersonaDTO personaDTO) {
        Persona persona = modelMapper.map(personaDTO, Persona.class);
        return persona;
    }
}
