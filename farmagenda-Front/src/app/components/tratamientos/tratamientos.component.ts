import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../interfaces/persona.interface';
import {
  Tratamiento,
  Tratamientoid,
} from '../../interfaces/tratamiento.interface';
import {
  MedResponse,
  Medicamento,
  createEmptyMedicamento,
} from '../../interfaces/medicamento.interface';
import { MedicinaService } from '../../services/medicina.service';
import { TratamientoService } from '../../services/tratamiento.service';
import { Observable, catchError, map, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.component.html',
  styleUrl: './tratamientos.component.css',
})
export class TratamientosComponent implements OnInit {
  persona!: Persona;

  tratamientos: Tratamiento[] = [];
  medicamentos: Medicamento[] = [];
  showForm: boolean = false;
  nombreMed: string = '';
  labMed: string = '';
  intervaloSeleccionado: number = 0;
  horaSeleccionada: string = '';
  medSeleccionado: Medicamento | undefined;

  private _medResponse!: MedResponse;

  constructor(
    private router: Router,
    private medicinaService: MedicinaService,
    private tratamientoService: TratamientoService,
    private personaService: PersonaService
  ) {
    const personaString = localStorage.getItem('persona');
    if (personaString) {
      this.persona = JSON.parse(personaString);
    }
  }

  ngOnInit() {
    this.persona === null
      ? this.router.navigate(['/'])
      : this.setTratamientos();
  }

  setTratamientos() {
    this.personaService.getTratamientos(this.persona.id).subscribe({
      next: (data) => {
        this.tratamientos = data.map((data: Tratamiento) => {
          let tratamiento: Tratamiento = {
            id: data.id,
            intervalodiario: data.intervalodiario,
            primeratoma: data.primeratoma,
            medicamento: createEmptyMedicamento(),
          } as Tratamiento;

          this.getMedicamento(data.id.idmedicamento).subscribe(
            (medicamento) => {
              tratamiento.medicamento = medicamento;
            }
          );

          return tratamiento;
        });
        console.log(this.tratamientos);
      },
      error: (error) => {
        console.error('Error al obtener tratamientos:', error);
      },
    });
  }

  getMedicamento(nregistro: string): Observable<Medicamento> {
    return this.medicinaService.getMedicamentoByNregistro(nregistro).pipe(
      map((data: any) => {
        // Aquí puedes formatear la respuesta del servicio al tipo Medicamento
        let medicamento: Medicamento = {
          nregistro: data.nregistro,
            descripcion: data.nombre,
            nombre: data.vtm.nombre,
            dosis: data.dosis,
            labtitular: data.labtitular,
            ffs: data.formaFarmaceuticaSimplificada.nombre,
            administracion: data.viasAdministracion.map(
              (via: any) => via.nombre
            ),
            fotos: data.fotos
              ? data.fotos.map((foto: any) => foto.url)
              : [],
            docs: data.docs.length > 1 ? [data.docs[1]] : [],
        };
        return medicamento;
      })
    );
  }

  addTratamiento() {
    const id: Tratamientoid = {
      idpaciente: this.persona.id,
      idmedicamento:
        this.medSeleccionado === undefined
          ? ''
          : this.medSeleccionado?.nregistro,
    };
    //console.log(this.medSeleccionado?.nregistro)
    const tratamiento: Tratamiento = {
      id: id,
      intervalodiario: this.intervaloSeleccionado.toString(),
      primeratoma: this.horaSeleccionada,
      medicamento: createEmptyMedicamento(),
    };
    this.getMedicamento(id.idmedicamento).subscribe(
      (medicamento) => {
        tratamiento.medicamento = medicamento;
      }
    );
    //console.log(tratamiento);

    this.tratamientoService.createTratamiento(tratamiento).subscribe({
      next: (data) => {
        console.log(data);
        this.toggleShowForm();
        this.setTratamientos();
      },
      error: (error) => {
        console.error('Error al crear el tratamiento:', error);
      },
    });
  }

  getMedicamentos() {
    this.medicinaService
      .getMedicamentoByNombre(this.nombreMed, this.labMed)
      .subscribe((data) => {
        this.medResponse = data;
        this.medicamentos = data.resultados.map((resultado: any) => {
          return {
            nregistro: resultado.nregistro,
            descripcion: resultado.nombre,
            nombre: resultado.vtm.nombre,
            dosis: resultado.dosis,
            labtitular: resultado.labtitular,
            ffs: resultado.formaFarmaceuticaSimplificada.nombre,
            administracion: resultado.viasAdministracion.map(
              (via: any) => via.nombre
            ),
            fotos: resultado.fotos
              ? resultado.fotos.map((foto: any) => foto.url)
              : [],
            docs: resultado.docs.length > 1 ? [resultado.docs[1]] : [],
          } as Medicamento;
        });
        //console.log(this.medicamentos)
      });
  }

  toggleShowForm(): void {
    this.showForm = !this.showForm;
    //console.log('showAddTratamiento:', this.showAddTratamiento);
  }

  toggleSelectMed(medicamento: Medicamento) {
    this.medSeleccionado = medicamento;
    this.medicamentos = [medicamento];
  }

  toggleDeselectMed() {
    this.medSeleccionado = undefined;
    this.getMedicamentos();
  }

  onInputChange() {
    (this.nombreMed === '' && this.labMed === '') ? this.medicamentos = [] : this.getMedicamentos();
  }

  get medResponse(): MedResponse {
    return this._medResponse;
  }

  set medResponse(valor: MedResponse) {
    this._medResponse = valor;
  }
}
