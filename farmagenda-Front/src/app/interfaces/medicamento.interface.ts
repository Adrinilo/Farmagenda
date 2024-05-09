export interface MedResponse {
  totalFilas: number;
  pagina: number;
  tamanioPagina: number;
  resultados: Medicamento[];
}

export interface Medicamento {
  nregistro: string;
  descripcion: string;
  nombre: string;
  dosis: string;
  labtitular: string;
  ffs: string;
  administracion: string[];
  fotos: string[];
  docs: Doc[];
}

export interface Doc {
  url: string;
  urlHtml: string;
}

// Implementación del constructor vacío
export function createEmptyMedicamento(): Medicamento {
  return {
    nregistro: '',
    descripcion: '',
    nombre: '',
    dosis: '',
    labtitular: '',
    ffs: '',
    administracion: [],
    fotos: [],
    docs: [],
  };
}
