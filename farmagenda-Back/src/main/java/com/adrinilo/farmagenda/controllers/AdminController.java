package com.adrinilo.farmagenda.controllers;

import com.adrinilo.farmagenda.dto.AdministracionDTO;
import com.adrinilo.farmagenda.entities.AdministracionId;
import com.adrinilo.farmagenda.services.AdminService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/administraciones")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @GetMapping
    public ResponseEntity<List<AdministracionDTO>> listAdministraciones() {
        return ResponseEntity.ok(adminService.getAllAdmin());
    }

    @GetMapping("/")
    public ResponseEntity<AdministracionDTO> getAdminById(@RequestParam(name = "idadmin") String idadmin, @RequestParam(name = "idpaciente") String idpaciente) {
        AdministracionId administracionId = new AdministracionId(Long.parseLong(idadmin), Long.parseLong(idpaciente));
        return ResponseEntity.ok(adminService.getAdminById(administracionId));
    }

    @PostMapping
    public ResponseEntity<AdministracionDTO> createAdmin(@Valid @RequestBody AdministracionDTO administracionDTO) {
        return new ResponseEntity<>(adminService.createAdmin(administracionDTO), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<AdministracionDTO> updateTratamiento(@Valid @RequestBody AdministracionDTO administracionDTO,
                                                                @PathVariable(name = "id") AdministracionId id) {
        AdministracionDTO administracionActualizada = adminService.updateAdmin(administracionDTO, id);
        return new ResponseEntity<>(administracionActualizada, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTratamiento(@PathVariable(name = "id") AdministracionId id) {
        adminService.deleteAdmin(id);
        return new ResponseEntity<>("Administracion eliminada con exito", HttpStatus.OK);
    }
}
