package com.adrinilo.farmagenda.controllers;

import com.adrinilo.farmagenda.dto.AdministracionDTO;
import com.adrinilo.farmagenda.dto.PersonaDTO;
import com.adrinilo.farmagenda.entities.AdministracionId;
import com.adrinilo.farmagenda.entities.TratamientoId;
import com.adrinilo.farmagenda.services.AdminService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/administracion")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping
    public ResponseEntity<List<AdministracionDTO>> listAdministraciones() {
        return ResponseEntity.ok(adminService.getAllAdmin());
    }

    @GetMapping("/")
    public ResponseEntity<AdministracionDTO> getAdminById(@RequestParam(name = "idadmin") String idadmin, @RequestParam(name = "idpaciente") String idpaciente) {
        AdministracionId administracionId = new AdministracionId();
        administracionId.setIdadmin(idadmin);
        administracionId.setIdpaciente(idpaciente);
        return ResponseEntity.ok(adminService.getAdminById(administracionId));
    }

    @PostMapping
    public ResponseEntity<AdministracionDTO> createAdmin(@RequestBody AdministracionDTO administracionDTO) {
        System.out.println(administracionDTO.toString());
        return new ResponseEntity<>(adminService.createAdmin(administracionDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdministracionDTO> updateTratamiento(@Valid @RequestBody AdministracionDTO administracionDTO,
                                                                @PathVariable(name = "id") AdministracionId id) {
        AdministracionDTO administracionActualizada = adminService.updateAdmin(administracionDTO, id);
        return new ResponseEntity<>(administracionActualizada, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<String> deleteTratamiento(@RequestBody AdministracionId id) {
        adminService.deleteAdmin(id);
        return new ResponseEntity<>("Administración borrada con exito", HttpStatus.OK);
    }
}
