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
import { Observable, map } from 'rxjs';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../dialogs/confirmdialog/confirmdialog.component';

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
  tomasSeleccionadas: number = 0;
  horaSeleccionada: string = '';
  medSeleccionado: Medicamento | undefined;

  private _medResponse!: MedResponse;

  constructor(
    private router: Router,
    private medicinaService: MedicinaService,
    private tratamientoService: TratamientoService,
    private personaService: PersonaService,
    private dialog: MatDialog
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
            tomasDiarias: data.tomasDiarias,
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
        //console.log(this.tratamientos);
      },
      error: (error) => {
        console.error('Error al obtener tratamientos:', error);
      },
    });
  }

  getMedicamento(nregistro: string): Observable<Medicamento> {
    return this.medicinaService.getMedicamentoByNregistro(nregistro).pipe(
      map((data: any) => {
        let medicamento: Medicamento = {
          nregistro: data.nregistro,
          descripcion: data.nombre,
          nombre: data.vtm.nombre,
          dosis: data.dosis,
          labtitular: data.labtitular,
          ffs: data.formaFarmaceuticaSimplificada.nombre,
          administracion: data.viasAdministracion.map((via: any) => via.nombre),
          fotos: data.fotos ? data.fotos.map((foto: any) => foto.url) : [],
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
      tomasDiarias: this.tomasSeleccionadas.toString(),
      primeratoma: this.horaSeleccionada,
      medicamento: createEmptyMedicamento(),
    };

    this.getMedicamento(id.idmedicamento).subscribe((medicamento) => {
      tratamiento.medicamento = medicamento;
    });
    //console.log(tratamiento);

    this.tratamientoService.createTratamiento(tratamiento).subscribe({
      next: (data) => {
        //console.log(data);
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

  onDelete(tratamiento: Tratamiento): void {    
    this.tratamientoService.deleteTratamiento(tratamiento.id).subscribe({
      next: (data) => {
        console.log("Tratamiento eliminado con exito: "+data);
        window.location.reload();
      },
      error: (error) => {
        console.error('Error al eliminar el tratamiento:', error);
        //console.log('Mensaje del error:', error.error);
      },
    });
  }

  openDialogDelete(tratamiento: Tratamiento): void {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    dialogConfig.data = {
      mensaje: '¿Desea eliminar el tratamiento?',
      medicamento: tratamiento.medicamento.descripcion,
      paciente: this.persona.nombre,
    };

    dialogConfig.width = '400px';
    dialogConfig.panelClass = 'dialog-custom'; // Ajustar estilo del contenedor del dialogo

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // El usuario confirmó la eliminación
        console.log('El usuario confirmó la eliminación');
        this.onDelete(tratamiento);
      } else {
        // El usuario canceló la eliminación
        console.log('El usuario canceló la eliminación');
      }
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

  toggleEdit(tratamiento: Tratamiento) {
    this.medSeleccionado = undefined;
    this.getMedicamentos();
  }

  onInputChange() {
    this.nombreMed === '' && this.labMed === ''
      ? (this.medicamentos = [])
      : this.getMedicamentos();
  }

  get medResponse(): MedResponse {
    return this._medResponse;
  }

  set medResponse(valor: MedResponse) {
    this._medResponse = valor;
  }
}
