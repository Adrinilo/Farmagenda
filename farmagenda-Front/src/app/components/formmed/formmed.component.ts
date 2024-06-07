import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MedicinaService } from '../../services/medicina.service';
import {
  MedResponse,
  Medicamento,
  createEmptyMedicamento,
} from '../../interfaces/medicamento.interface';
import { Router } from '@angular/router';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-formmed',
  templateUrl: './formmed.component.html',
  styleUrl: './formmed.component.css',
})
export class FormmedComponent {
  @Input() parentForm!: FormGroup;
  medicamentos: Medicamento[] = [];
  medicamentosFull: Medicamento[] = [];
  private _medResponse!: MedResponse;
  @Output() medSelected = new EventEmitter<Medicamento>();
  medSeleccionado!: Medicamento;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  totalLength = this.medicamentosFull.length; // El número total de elementos
  pageSize = 25; // Tamaño de página por defecto
  page = 1; // Tamaño de página inicial
  pageSizeOptions: number[] = [4, 8, 16, 32];
  
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
        this.parentForm.get('laboratorio')?.value,
        this.page
      )
      .subscribe((data) => {
        this.medResponse = data;
        this.totalLength = this.medResponse.totalFilas
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

        this.medicamentosFull = this.medicamentos
        //console.log(this.medicamentos)
      });
  }

  consultar(nregistro: string) {
    this.router.navigate([`/prospectos`, nregistro]);
  }


  ngAfterViewInit() {
    this.paginator.page.subscribe((event: PageEvent) => {
      console.log(event);
      this.updatePageData(event);
    });
  }

  updatePageData(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.getMedicamentos();
    const startIndex = event.pageIndex * event.pageSize;
    const endIndex = startIndex + event.pageSize;
    console.log(`Mostrando elementos de ${startIndex} a ${endIndex}`);
  }

  toggleSelectMed(medicamento: Medicamento) {
    this.medSeleccionado = medicamento;
    this.medSelected.emit(medicamento);
    //console.log(this.medSelected)
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
