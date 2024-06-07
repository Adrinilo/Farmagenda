import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PersonaService } from '../../services/persona.service';
import { Persona } from '../../interfaces/persona.interface';
import {
  Tratamiento,
  Tratamientoid,
  createEmptyTratamientoId,
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
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-tratamientos',
  templateUrl: './tratamientos.component.html',
  styleUrl: './tratamientos.component.css',
})
export class TratamientosComponent implements OnInit {
  persona!: Persona;
  parentForm!: FormGroup;
  buttonText: string = 'Añadir tratamiento';
  showForm: boolean = false;
  ttoUpdate: Tratamientoid = createEmptyTratamientoId(); // Tratamiento en edición
  tratamientos: Tratamiento[] = [];
  medicamentos: Medicamento[] = [];
  medSeleccionado: Medicamento = createEmptyMedicamento();

  private _medResponse!: MedResponse;

  constructor(
    private medicinaService: MedicinaService,
    private tratamientoService: TratamientoService,
    private personaService: PersonaService,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    const personaString = localStorage.getItem('persona');
    if (personaString) {
      this.persona = JSON.parse(personaString);
    }
    this.parentForm = this.fb.group({
      nombre: new FormControl(''),
      laboratorio: new FormControl(''),
      tomas: new FormControl(''),
      hora: new FormControl(''),
      notas: new FormControl(''),
    });
  }

  ngOnInit() {
    this.setTratamientos();
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
            notas: data.notas,
          } as Tratamiento;

          this.getMedicamento(data.id.idmedicamento).subscribe(
            (medicamento) => {
              tratamiento.medicamento = medicamento;
            }
          );

          return tratamiento;
        });
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
    if (this.medSeleccionado.nregistro != '') {
      const id: Tratamientoid = {
        idpaciente: this.persona.id,
        idmedicamento: this.medSeleccionado.nregistro,
      };

      const tratamiento: Tratamiento = {
        id: id,
        tomasDiarias: this.parentForm.get('tomas')?.value,
        primeratoma: this.convertTo24(this.parentForm.get('hora')?.value),
        medicamento: createEmptyMedicamento(),
        notas: this.parentForm.get('notas')?.value,
      };

      console.log(tratamiento);

      this.getMedicamento(id.idmedicamento).subscribe((medicamento) => {
        tratamiento.medicamento = medicamento;
      });

      this.tratamientoService.createTratamiento(tratamiento).subscribe({
        next: () => {
          this.toggleShowForm();
          this.setTratamientos();
        },
        error: (error) => {
          console.error('Error al crear el tratamiento:', error);
          this.openSnackBar('Error al crear el tratamiento');
        },
      });
    } else {
      this.openSnackBar('Seleccione un medicamento');
    }
  }

  updateTratamiento() {
    const id: Tratamientoid = {
      idpaciente: this.persona.id,
      idmedicamento: this.medSeleccionado?.nregistro,
    };
    const tratamiento: Tratamiento = {
      id: id,
      tomasDiarias: this.parentForm.get('tomas')?.value,
      primeratoma: this.convertTo24(this.parentForm.get('hora')?.value),
      medicamento: this.medSeleccionado,
      notas: this.parentForm.get('notas')?.value,
    };

    this.tratamientoService
      .updatePersona(tratamiento, this.ttoUpdate)
      .subscribe({
        next: (data) => {
          this.toggleShowForm();
          this.setTratamientos();
        },
        error: (error) => {
          console.error('Error al actualizar el tratamiento:', error);
        },
      });
  }

  onDelete(tratamiento: Tratamiento): void {
    this.tratamientoService.deleteTratamiento(tratamiento.id).subscribe({
      next: (data) => {
        console.log('Tratamiento eliminado con exito: ' + data);
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

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000, // Duración fija de 5 segundos
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  toggleShowForm(): void {
    if (!this.showForm) {
      // Solo si es falso, por tanto se va a añadir un tratamiento
      this.medSeleccionado = createEmptyMedicamento(); // Vaciamos el medicamento seleccionado
      this.medicamentos = []; // Reiniciamos la lista de medicamentos
      this.parentForm.setValue({
        // Vaciamos los datos del formulario
        nombre: '',
        laboratorio: '',
        tomas: '',
        hora: '',
        notas: '',
      });
      localStorage.removeItem('medSelected'); // Retiramos el medicamento seleccionado
      this.buttonText = 'Añadir tratamiento';
      this.showForm = true; // Mostramos el formulario
    } else {
      this.showForm = false;
      this.ttoUpdate = createEmptyTratamientoId(); // En caso estar editando y pulsar en cancelar
      this.parentForm.get('nombre')?.enable();
      this.parentForm.get('laboratorio')?.enable();
    }
  }

  onMedSelected(medicamento: Medicamento) {
    this.medSeleccionado = medicamento;
  }

  toggleEdit(tratamiento: Tratamiento) {
    this.medSeleccionado = tratamiento.medicamento;
    //this.medicamentos = [this.medSeleccionado];
    localStorage.setItem(
      'medSelected',
      JSON.stringify(tratamiento.medicamento)
    );
    this.parentForm.setValue({
      nombre: tratamiento.medicamento.nombre,
      laboratorio: tratamiento.medicamento.labtitular,
      tomas: tratamiento.tomasDiarias,
      hora: this.convertTo12(tratamiento.primeratoma),
      notas: tratamiento.notas,
    });
    this.parentForm.get('nombre')?.disable();
    this.parentForm.get('laboratorio')?.disable();

    this.buttonText = 'Editar tratamiento';

    this.ttoUpdate = tratamiento.id;
    this.showForm = true;
  }

  onSubmit() {
    this.ttoUpdate.idpaciente != ''
      ? this.updateTratamiento()
      : this.addTratamiento();
  }

  consultar(medicamento: Medicamento) {
    this.router.navigate([`/prospectos`, medicamento.nregistro]);
  }

  get medResponse(): MedResponse {
    return this._medResponse;
  }

  set medResponse(valor: MedResponse) {
    this._medResponse = valor;
  }

  convertTo24(formato12Horas: string): string {
    // Extraer el período AM o PM
    const [horaMinutos, periodo] = formato12Horas.split(' ');
    // Dividir la hora y los minutos
    let [horas, minutos] = horaMinutos.split(':').map(Number);

    // Convertir a formato de 24 horas
    if (periodo === 'PM' && horas !== 12) {
      horas += 12;
    } else if (periodo === 'AM' && horas === 12) {
      horas = 0;
    }

    // Asegurar que las horas y minutos tienen dos dígitos
    const horas24 = horas.toString().padStart(2, '0');
    const minutos24 = minutos.toString().padStart(2, '0');

    // Formatear la salida con segundos
    return `${horas24}:${minutos24}:00`;
  }

  convertTo12(formato24Horas: string): string {
    // Dividir la hora y los minutos
    let [horas, minutos, segundos] = formato24Horas.split(':').map(Number);

    // Determinar el período AM o PM
    const periodo = horas >= 12 ? 'PM' : 'AM';

    // Convertir las horas a formato de 12 horas
    horas = horas % 12 || 12; // 0 o 12 horas se convierte a 12 horas en formato de 12 horas

    // Asegurar que las horas y minutos tienen dos dígitos
    const horas12 = horas.toString().padStart(2, '0');
    const minutos12 = minutos.toString().padStart(2, '0');

    // Formatear la salida
    return `${horas12}:${minutos12} ${periodo}`;
  }
}
