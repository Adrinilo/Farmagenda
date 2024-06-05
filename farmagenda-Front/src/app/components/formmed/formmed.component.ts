import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MedicinaService } from '../../services/medicina.service';
import {
  MedResponse,
  Medicamento,
  createEmptyMedicamento,
} from '../../interfaces/medicamento.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-formmed',
  templateUrl: './formmed.component.html',
  styleUrl: './formmed.component.css',
})
export class FormmedComponent {
  @Input() parentForm!: FormGroup;
  medicamentos: Medicamento[] = [];
  private _medResponse!: MedResponse;
  @Output() medSelected = new EventEmitter<Medicamento>();
  medSeleccionado!: Medicamento;
  
  constructor(
    private medicinaService: MedicinaService,
    private router: Router
  ) {
    const medString = localStorage.getItem('medSelected');
    if (medString) {
      this.medSeleccionado = JSON.parse(medString);
      this.medicamentos = [this.medSeleccionado];
    }
    console.log(this.medSeleccionado)
  }

  onInputChange() {
    this.parentForm.get('nombre')?.value === '' &&
    this.parentForm.get('laboratorio')?.value === ''
      ? (this.medicamentos = [])
      : this.getMedicamentos();
  }

  getMedicamentos() {
    this.medicinaService
      .getMedicamentos(
        this.parentForm.get('nombre')?.value,
        this.parentForm.get('laboratorio')?.value
      )
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

  consultar(nregistro: string) {
    this.router.navigate([`/prospectos`, nregistro]);
  }

  toggleSelectMed(medicamento: Medicamento) {
    this.medSeleccionado = medicamento;
    this.medSelected.emit(medicamento);
    console.log(this.medSelected)
    this.medicamentos = [medicamento];
    this.parentForm.get('nombre')?.disable();
    this.parentForm.get('laboratorio')?.disable();
  }

  toggleDeselectMed() {
    this.medSeleccionado = createEmptyMedicamento();
    this.medSelected.emit(this.medSeleccionado);
    this.getMedicamentos();
    this.parentForm.get('nombre')?.enable();
    this.parentForm.get('laboratorio')?.enable();
  }

  isProspectosRoute(): boolean {
    return this.router.url === '/prospectos';
  }

  get medResponse(): MedResponse {
    return this._medResponse;
  }

  set medResponse(valor: MedResponse) {
    this._medResponse = valor;
  }
}
