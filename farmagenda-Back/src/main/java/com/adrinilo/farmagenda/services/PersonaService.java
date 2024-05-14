package com.adrinilo.farmagenda.services;

import com.adrinilo.farmagenda.dto.AdministracionDTO;
import com.adrinilo.farmagenda.dto.PersonaDTO;
import com.adrinilo.farmagenda.dto.PersonaResponse;

import java.util.List;

public interface PersonaService {

    public PersonaDTO createPersona(PersonaDTO personaDTO);

    public PersonaResponse getAllPersonas(int pageNum, int itemsPerPage, String orderBy, String sortDir);

    public PersonaDTO getPersonaById(String id);

    public List<PersonaDTO> getPersonasACargoById(String id);

    public PersonaDTO updatePersona(PersonaDTO personaDTO, String id);

    public void deletePersona(String id);

}
