package com.adrinilo.farmagenda.services;

import com.adrinilo.farmagenda.dto.AdministracionDTO;
import com.adrinilo.farmagenda.entities.Administracion;
import com.adrinilo.farmagenda.entities.AdministracionId;
import com.adrinilo.farmagenda.entities.Persona;
import com.adrinilo.farmagenda.exceptions.ResourceNotFoundException;
import com.adrinilo.farmagenda.repositories.AdminRepository;
import com.adrinilo.farmagenda.repositories.PersonaRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private PersonaRepository personaRepository;

    @Override
    public AdministracionDTO createAdmin(AdministracionDTO administracionDTO) {
        Administracion administracion = mapearEntidad(administracionDTO);
        Administracion newAdministracion = adminRepository.save(administracion);
        return mapearDTO(newAdministracion);
    }

    @Override
    public List<AdministracionDTO> getAllAdmin() {
        List<Administracion> listAdministracion = adminRepository.findAll();
        List<AdministracionDTO> administraciones = listAdministracion.stream().map(administracion -> mapearDTO(administracion))
                .collect(Collectors.toList());

        return administraciones;
    }

    @Override
    public AdministracionDTO getAdminById(AdministracionId id) {
        Administracion administracion = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Administracion", "id", id.toString()));
        return mapearDTO(administracion);
    }

    @Override
    public List<AdministracionDTO> getAdminByIdpaciente(String id) {
        List<Administracion> listAdministracion = adminRepository.findById_Idpaciente(id);
        List<AdministracionDTO> administraciones = listAdministracion.stream().map(administracion -> mapearDTO(administracion))
                .collect(Collectors.toList());
        return administraciones;
    }

    @Override
    public AdministracionDTO updateAdmin(AdministracionDTO administracionDTO, AdministracionId id) {
        Administracion administracion = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Administracion", "id", id.toString()));

        Persona admin = personaRepository.findById(administracionDTO.getIdadmin().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Admin", "id", administracionDTO.getIdadmin().getId().toString()));

        Persona paciente = personaRepository.findById(administracionDTO.getIdpaciente().getId())
                .orElseThrow(() -> new ResourceNotFoundException("Paciente", "id", administracionDTO.getIdpaciente().getId().toString()));

        administracion.setIdadmin(admin);
        administracion.setIdpaciente(paciente);
        administracion.setRol(administracionDTO.getRol());

        Administracion administracionUpdated = adminRepository.save(administracion);
        return mapearDTO(administracionUpdated);
    }

    @Override
    public void deleteAdmin(AdministracionId id) {
        Administracion administracion = adminRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Administracion", "id", id.toString()));
        adminRepository.delete(administracion);
    }

    // Convierte entidad a DTO
    private AdministracionDTO mapearDTO(Administracion administracion) {
        return modelMapper.map(administracion, AdministracionDTO.class);
    }

    // Convierte de DTO a Entidad
    private Administracion mapearEntidad(AdministracionDTO administracionDTO) {
        Administracion administracion = modelMapper.map(administracionDTO, Administracion.class);
        AdministracionId id = new AdministracionId();
        id.setIdadmin(administracionDTO.getId().getIdadmin());
        id.setIdpaciente(administracionDTO.getId().getIdpaciente());
        administracion.setId(id);
        return administracion;
    }
}
