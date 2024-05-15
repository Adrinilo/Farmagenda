import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PersonaService } from '../../../services/persona.service';
import { AdministracionService } from '../../../services/administracion.service';

@Component({
  selector: 'app-optionsdialog',
  templateUrl: './optionsdialog.component.html',
  styleUrl: './optionsdialog.component.css'
})
export class OptionsDialogComponent {

  datos: any

  constructor(
    public dialogRef: MatDialogRef<OptionsDialogComponent>,
    private personaService: PersonaService,
    private administracionService: AdministracionService,
    @Inject(MAT_DIALOG_DATA) data:any) {
      this.datos = data;
    }

  onClickEliminar(): void {
    this.administracionService.deleteAdministracion(this.datos.idadmin, this.datos.paciente.id).subscribe({
      next: (data) => {
        console.log("Administracion eliminada con exito: "+data);
        this.deletePersona()
        this.dialogRef.close(true);
        window.location.reload();
      },
      error: (error) => {
        console.error('Error al eliminar la administracion:', error);
      },
    });
  }
  
  deletePersona() {
    this.personaService.deletePersona(this.datos.paciente.id).subscribe({
      next: (data) => {
        console.log("Persona eliminada con exito: "+data);
        this.dialogRef.close(true);
        window.location.reload();
      },
      error: (error) => {
        console.error('Error al eliminar la persona:', error);
      },
    });
  }
}
