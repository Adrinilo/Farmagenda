import { Tratamiento } from "./tratamiento.interface";

export interface Persona {
    id: number;
    nombre: string;
    telefono: string;
    email: string;
    tratamientos: Tratamiento[];
}
