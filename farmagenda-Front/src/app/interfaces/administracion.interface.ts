import { Persona } from './persona.interface';

export interface AdministracionId {
    idadmin: string;
    idpaciente: string;
}

export interface Administracion {
  id: AdministracionId;
  idadmin: Persona;
  idpaciente: Persona;
}
