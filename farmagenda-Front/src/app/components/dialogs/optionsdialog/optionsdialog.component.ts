import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonaService } from '../../../services/persona.service';
import { AdministracionService } from '../../../services/administracion.service';

@Component({
  selector: 'app-optionsdialog',
  templateUrl: './optionsdialog.component.html',
  styleUrl: './optionsdialog.component.css',
})
export class OptionsDialogComponent {
  datos: any;

  constructor(
    public dialogRef: MatDialogRef<OptionsDialogComponent>,
    private personaService: PersonaService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.datos = data;
  }

  onClick(option: string): void {
    this.dialogRef.close(option);
  }

  onClickEditar(): void {
    this.personaService.updatePersona(this.datos.paciente).subscribe({
      next: (data) => {
        this.dialogRef.close('edit');
        console.log('Paciente editado con exito: ' + data);
        window.location.reload();
      },
      error: (error) => {
        console.error('Error al editar el paciente:', error);
      },
    });
  }
}
