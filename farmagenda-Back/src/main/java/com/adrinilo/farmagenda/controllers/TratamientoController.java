package com.adrinilo.farmagenda.controllers;

import com.adrinilo.farmagenda.dto.TratamientoDTO;
import com.adrinilo.farmagenda.entities.Tratamiento;
import com.adrinilo.farmagenda.entities.TratamientoId;
import com.adrinilo.farmagenda.services.TratamientoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/tratamientos")
public class TratamientoController {

    @Autowired
    private TratamientoService tratamientoService;

    @GetMapping
    public ResponseEntity<List<TratamientoDTO>> listTratamientos() {
        return ResponseEntity.ok(tratamientoService.getAllTratamientos());
    }

    @GetMapping("/")
    public ResponseEntity<TratamientoDTO> getTratamientoById(@RequestParam(name = "idpaciente") String idPaciente, @RequestParam(name = "idmedicamento") String idMedicamento) {
        TratamientoId tratamientoId = new TratamientoId();
        tratamientoId.setIdpaciente(idPaciente);
        tratamientoId.setIdmedicamento(Long.parseLong(idMedicamento));
        return ResponseEntity.ok(tratamientoService.getTratamientoById(tratamientoId));
    }

    @PostMapping
    public ResponseEntity<TratamientoDTO> createTratamiento(@Valid @RequestBody TratamientoDTO tratamientoDTO) {
        return new ResponseEntity<>(tratamientoService.createTratamiento(tratamientoDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{idpaciente}/{idmedicamento}")
    public ResponseEntity<TratamientoDTO> updateTratamiento(@Valid @RequestBody TratamientoDTO tratamientoDTO,
                                                            @PathVariable(name = "idpaciente") String idpaciente, @PathVariable(name = "idmedicamento") String idmedicamento) {
        TratamientoDTO tratamientoActualizado = new TratamientoDTO();
        TratamientoId tratamientoId = new TratamientoId();
        tratamientoId.setIdpaciente(idpaciente);
        tratamientoId.setIdmedicamento(Long.parseLong(idmedicamento));
        if (tratamientoId.equals(tratamientoDTO.getId())){
            tratamientoActualizado = tratamientoService.updateTratamiento(tratamientoDTO, tratamientoId);
        } else {
            this.deleteTratamiento(tratamientoId);
            tratamientoActualizado = this.createTratamiento(tratamientoDTO).getBody();
        }
        return new ResponseEntity<>(tratamientoActualizado, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<TratamientoDTO> deleteTratamiento(@RequestBody TratamientoId tratamientoId) {
        TratamientoDTO tratamientoDTO = tratamientoService.getTratamientoById(tratamientoId);
        tratamientoService.deleteTratamiento(tratamientoId);
        return new ResponseEntity<>(tratamientoDTO, HttpStatus.OK);
    }
}
