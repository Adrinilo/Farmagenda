import { Medicamento } from "./medicamento.interface";

export interface Tratamientoid {
    idpaciente: string;
    idmedicamento: string;
}

export interface Tratamiento {
    id: Tratamientoid;
    intervalodiario: string;
    primeratoma: string;
    medicamento: Medicamento;
}

