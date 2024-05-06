import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tratamiento } from '../interfaces/tratamiento.interface';

@Injectable({
  providedIn: 'root'
})
export class TratamientoService {

  private baseUrl = 'http://localhost:8080/api/tratamientos';

  constructor(private http: HttpClient) { }


  addTratamiento(tratamiento: any): Observable<Tratamiento> {
    return this.http.post<Tratamiento>(this.baseUrl, tratamiento);
  }
}
