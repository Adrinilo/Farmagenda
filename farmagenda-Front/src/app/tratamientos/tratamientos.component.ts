import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from '../services/persona.service';
import { Persona } from '../interfaces/persona.interface';
import { Tratamiento } from '../interfaces/tratamiento.interface';
import { Doc, MedResponse, Medicamento } from '../interfaces/medicamento.interface';
import { MedicinaService } from '../services/medicina.service';

@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.component.html',
  styleUrl: './tratamientos.component.css',
})
export class TratamientosComponent implements OnInit {
  persona!: Persona;

  tratamientos: Tratamiento[] = [];
  medicamentos: Medicamento[] = [];
  private _addTratamiento: boolean = false;
  medResponse: MedResponse | undefined;
  nombreMed: string = '';
  labMed: string = '';
  
  numeroSeleccionado: number = 0;
  horaSeleccionada: string = '';
  medSeleccionado: Medicamento | undefined;

  constructor(private router: Router, private personaService: PersonaService, private medicinaService: MedicinaService) {
    const personaString = localStorage.getItem('persona');
    if (personaString) {
      this.persona = JSON.parse(personaString);
    }
  }

  ngOnInit() {
    if (this.persona === null) {
      this.router.navigate(['/']);
    } else {
      this.personaService.getTratamientos(this.persona.id).subscribe((data) => {
        this.tratamientos = data;
      });
    }
  }

  toggleShowAddTratamiento(): void {
    this.addTratamiento = !this.addTratamiento;
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
    this.getMedicamentos();
  }

  getMedicamentos() {
    this.medicinaService.getMedicamentoByNombre(this.nombreMed, this.labMed).subscribe((data) => {
      this.medResponse = data;
      this.medicamentos = data.resultados.map((resultado: any) => {
        return {
          nregistro: resultado.nregistro,
          descripcion: resultado.nombre,
          nombre: resultado.vtm.nombre,
          dosis: resultado.dosis,
          labtitular: resultado.labtitular,
          ffs: resultado.formaFarmaceuticaSimplificada.nombre,
          administracion: resultado.viasAdministracion.map((via: any) => via.nombre),
          fotos: resultado.fotos ? resultado.fotos.map((foto: any) => foto.url) : [],
          docs: resultado.docs.length > 1 ? [resultado.docs[1]] : []
        } as Medicamento; 
    });
    //console.log(this.medicamentos)
    });
  }

  get addTratamiento(): boolean {
    return this._addTratamiento;
  }

  set addTratamiento(valor: boolean) {
    this._addTratamiento = valor;
  }
}
