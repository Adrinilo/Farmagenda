import { Tratamientoid } from "./tratamientoid.interface";

export interface Tratamiento {
    id: Tratamientoid;
    pacienteNombre: string;
    intervaloDiario: string;
    primeraToma: string;
}
