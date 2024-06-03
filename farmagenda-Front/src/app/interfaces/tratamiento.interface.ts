import { Medicamento } from "./medicamento.interface";

export interface Tratamientoid {
    idpaciente: string;
    idmedicamento: string;
}

// Implementación del constructor vacío
export function createEmptyTratamientoId(): Tratamientoid {
    return {
        idpaciente: '',
        idmedicamento: ''
    };
  }

export interface Tratamiento {
    id: Tratamientoid;
    tomasDiarias: number;
    primeratoma: string;
    medicamento: Medicamento;
}
