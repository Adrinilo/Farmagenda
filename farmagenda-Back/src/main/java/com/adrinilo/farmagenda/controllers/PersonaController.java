package com.adrinilo.farmagenda.controllers;

import com.adrinilo.farmagenda.dto.AdministracionDTO;
import com.adrinilo.farmagenda.dto.PersonaDTO;
import com.adrinilo.farmagenda.dto.PersonaResponse;
import com.adrinilo.farmagenda.dto.TratamientoDTO;
import com.adrinilo.farmagenda.services.AdminService;
import com.adrinilo.farmagenda.services.PersonaService;
import com.adrinilo.farmagenda.services.TratamientoService;
import com.adrinilo.farmagenda.utilities.AppConstants;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/personas")
public class PersonaController {

    @Autowired
    private PersonaService personaService;

    @Autowired
    private AdminService adminService;

    @Autowired
    private TratamientoService tratamientoService;

    @GetMapping
    public PersonaResponse listPersonas(
            @RequestParam(value = "pageNum", defaultValue = AppConstants.PAGE_NUMBER_DEFAULT, required = false) int pageNum,
            @RequestParam(value = "itemsPerPage", defaultValue = AppConstants.ITEMS_PER_PAGE_DEFAULT, required = false) int itemsPerPage,
            @RequestParam(value = "orderBy", defaultValue = AppConstants.ORDER_BY_DEFAULT, required = false) String orderBy,
            @RequestParam(value = "sortDir", defaultValue = AppConstants.ORDER_DIRECTION_DEFAULT, required = false) String sortDir) {
        return personaService.getAllPersonas(pageNum, itemsPerPage, orderBy, sortDir);
    }

    @GetMapping("/{id}")
    public ResponseEntity<PersonaDTO> getPersonaById(@PathVariable(name = "id") String id) {
        return ResponseEntity.ok(personaService.getPersonaById(id));
    }

    @GetMapping("/{id}/administradores")
    public ResponseEntity<List<AdministracionDTO>> getAdminByIdpaciente(@PathVariable(name = "id") String id) {
        return ResponseEntity.ok(adminService.getAdminByIdpaciente(id));
    }

    @GetMapping("/{id}/tratamientos")
    public ResponseEntity<List<TratamientoDTO>> getTratamientosByIdpaciente(@PathVariable(name = "id") String id) {
        return ResponseEntity.ok(tratamientoService.getTratamientosByIdpaciente(id));
    }

    @PostMapping
    public ResponseEntity<PersonaDTO> createPersona(@Valid @RequestBody PersonaDTO personaDTO) {
        return new ResponseEntity<>(personaService.createPersona(personaDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<PersonaDTO> updatePersona(@Valid @RequestBody PersonaDTO personaDTO,
                                                                @PathVariable(name = "id") String id) {
        PersonaDTO personaResponse = personaService.updatePersona(personaDTO, id);
        return new ResponseEntity<>(personaResponse, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePersona(@PathVariable(name = "id") String id) {
        personaService.deletePersona(id);
        return new ResponseEntity<>("Persona eliminada con exito", HttpStatus.OK);
    }
}
