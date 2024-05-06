import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tratamiento } from '../interfaces/tratamiento.interface';
import { Persona } from '../interfaces/persona.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private baseUrl = 'http://localhost:8080/api/personas';

  constructor(private http: HttpClient) { }

  getPersonaById(id: number): Observable<Persona> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Persona>(url);
  }
  
  getTratamientos(id: number): Observable<Tratamiento[]> {
    const url = `${this.baseUrl}/${id}/tratamientos`
    return this.http.get<Tratamiento[]>(url);
  }

  addPersona(persona: any): Observable<Persona> {
    return this.http.post<any>(this.baseUrl, persona);
  }
}
