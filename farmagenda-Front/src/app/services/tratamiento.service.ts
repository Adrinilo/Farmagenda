import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tratamiento, Tratamientoid } from '../interfaces/tratamiento.interface';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {

  private baseUrl = 'http://localhost:8080/api/tratamientos';

  constructor(private http: HttpClient) { }


  createTratamiento(tratamiento: Tratamiento): Observable<Tratamiento> {
    return this.http.post<Tratamiento>(this.baseUrl, tratamiento);
  }

  updatePersona(tratamiento: Tratamiento, tratamientoid: Tratamientoid): Observable<Tratamiento> {
    const url = `${this.baseUrl}/${tratamientoid.idpaciente}/${tratamientoid.idmedicamento}`;
    return this.http.put<Tratamiento>(url, tratamiento);
  }

  deleteTratamiento(tratamientoId: Tratamientoid): Observable<string> {
    const options = {
      headers: new HttpHeaders({'Content-Type': 'application/json'}),
      body: tratamientoId,
      responseType: 'text' as 'json'
    };
    return this.http.request<string>('delete', `${this.baseUrl}`, options);
  }
}
