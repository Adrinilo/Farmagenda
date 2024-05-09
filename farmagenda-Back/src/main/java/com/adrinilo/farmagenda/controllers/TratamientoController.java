package com.adrinilo.farmagenda.controllers;

import com.adrinilo.farmagenda.dto.TratamientoDTO;
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

    @PutMapping("/{id}")
    public ResponseEntity<TratamientoDTO> updateTratamiento(@Valid @RequestBody TratamientoDTO tratamientoDTO,
                                                                @PathVariable(name = "id") TratamientoId id) {
        TratamientoDTO tratamientoActualizado = tratamientoService.updateTratamiento(tratamientoDTO, id);
        return new ResponseEntity<>(tratamientoActualizado, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTratamiento(@PathVariable(name = "id") TratamientoId id) {
        tratamientoService.deleteTratamiento(id);
        return new ResponseEntity<>("Tratamiento eliminado con exito", HttpStatus.OK);
    }
}
