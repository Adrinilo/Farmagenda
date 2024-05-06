package com.adrinilo.farmagenda.services;

import com.adrinilo.farmagenda.dto.AdministracionDTO;
import com.adrinilo.farmagenda.entities.AdministracionId;

import java.util.List;

public interface AdminService {

    public AdministracionDTO createAdmin(AdministracionDTO administracionDTO);
    public List<AdministracionDTO> getAllAdmin();
    public AdministracionDTO getAdminById(AdministracionId id);
    public List<AdministracionDTO> getAdminByIdpaciente(Long id);
    public AdministracionDTO updateAdmin(AdministracionDTO administracionDTO, AdministracionId id);
    public void deleteAdmin(AdministracionId id);
}
