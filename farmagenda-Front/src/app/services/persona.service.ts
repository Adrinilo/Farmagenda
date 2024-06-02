import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tratamiento } from '../interfaces/tratamiento.interface';
import { Persona } from '../interfaces/persona.interface';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  private baseUrl = 'http://localhost:8080/api/personas';

  constructor(private http: HttpClient) { }

  getPersonaById(id: string): Observable<Persona> {
    const url = `${this.baseUrl}/${id}`
    return this.http.get<Persona>(url);
  }
  
  getPersonasACargo(id: string): Observable<Persona[]> {
    const url = `${this.baseUrl}/${id}/pacientes`
    return this.http.get<Persona[]>(url);
  }

  getTratamientos(id: string): Observable<Tratamiento[]> {
    const url = `${this.baseUrl}/${id}/tratamientos`
    return this.http.get<Tratamiento[]>(url);
  }

  createPersona(persona: Persona): Observable<Persona> {
    return this.http.post<Persona>(this.baseUrl, persona);
  }

  updatePersona(persona: Persona): Observable<Persona> {
    console.log(persona.id)
    const url = `${this.baseUrl}/${persona.id}`;
    return this.http.put<Persona>(url, persona);
  }

  deletePersona(id: string): Observable<String> {
    return this.http.delete(`${this.baseUrl}/${id}`, { responseType: 'text' });
  }
}
