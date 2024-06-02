import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedResponse, Medicamento } from '../interfaces/medicamento.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicinaService {

  private baseUrl = 'https://cima.aemps.es/cima/rest';

  constructor(private http: HttpClient) { }

  // Obtener listado de medicamentos filtrando por nombre de medicamento y/o del laboratorio
  getMedicamentos(nombre: string, laboratorio: string): Observable<MedResponse> {
    const url = `${this.baseUrl}/medicamentos?nombre=${nombre}&laboratorio=${laboratorio}`
    return this.http.get<MedResponse>(url);
  }

  // Obtener un medicamento mediante su número de registro
  getMedicamentoByNregistro(nregistro: string): Observable<Medicamento> {
    const url = `${this.baseUrl}/medicamento?nregistro=${nregistro}`
    return this.http.get<Medicamento>(url);
  }

  // Obtener el prospecto de un medicamento en formato html
  // mediante su número de registro
  obtenerProspecto(nregistro: string): Observable<string> {
    const url = `${this.baseUrl}/docSegmentado/contenido/2?nregistro=${nregistro}`;
    const options = {
      headers: new HttpHeaders({'Accept': 'text/html'}),
      responseType: 'text' as 'json'
    };

    return this.http.get<string>(url, options);
  }

}
