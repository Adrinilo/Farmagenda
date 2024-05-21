import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Persona } from '../interfaces/persona.interface';
import { Administracion, AdministracionId } from '../interfaces/administracion.interface';



@Injectable({
  providedIn: 'root'
})
export class AdministracionService {

  private baseUrl = 'http://localhost:8080/api/administracion';

  constructor(private http: HttpClient) { }

  setAdmin(idadmin: Persona, idpaciente: Persona): Observable<any> {
    const administracionid: AdministracionId =  {
      idadmin: idadmin.id,
      idpaciente: idpaciente.id
    };
    const administracion: Administracion =  {
      id: administracionid,
      idadmin: idadmin,
      idpaciente: idpaciente
    };
    return this.http.post<any>(`${this.baseUrl}`, administracion);
  }

  deleteAdministracion(idadmin: string, idpaciente: string): Observable<Administracion> {
    const administracionid: AdministracionId =  {
      idadmin: idadmin,
      idpaciente: idpaciente
    };
    //console.log(administracionid);
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      body: administracionid
    };
    return this.http.delete<Administracion>(`${this.baseUrl}`, options);
  }
}
