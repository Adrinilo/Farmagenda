import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA  } from '@angular/material/dialog';
import { TratamientoService } from '../../../services/tratamiento.service';
import { Tratamientoid } from '../../../interfaces/tratamiento.interface';

@Component({
  selector: 'app-confirmdialog',
  templateUrl: './confirmdialog.component.html',
  styleUrl: './confirmdialog.component.css'
})
export class ConfirmDialogComponent implements OnInit {

  datos: any

  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    private tratamientoService: TratamientoService,
    @Inject(MAT_DIALOG_DATA) data:any) {
      this.datos = data;
    }

  ngOnInit(): void {
  }

  onClickEliminar(): void {
    const id: Tratamientoid = {
      idpaciente: this.datos.paciente.id,
      idmedicamento: this.datos.medicamento.nregistro
    };
    
    this.tratamientoService.deleteTratamiento(id).subscribe({
      next: (data) => {
        console.log("Tratamiento eliminado con exito: "+data);
        this.dialogRef.close(true);
        window.location.reload();
      },
      error: (error) => {
        console.error('Error al eliminar el tratamiento:', error);
        console.log('Mensaje del error:', error.error);
      },
    });
  }
}
