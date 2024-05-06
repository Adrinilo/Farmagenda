import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MedResponse } from '../interfaces/medicamento.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicinaService {

  private baseUrl = 'https://cima.aemps.es/cima/rest/medicamentos';

  constructor(private http: HttpClient) { }

  getMedicamentoByNombre(nombre: string, laboratorio: string): Observable<MedResponse> {
    const url = `${this.baseUrl}?nombre=${nombre}&laboratorio=${laboratorio}`
    return this.http.get<MedResponse>(url);
  }
}
