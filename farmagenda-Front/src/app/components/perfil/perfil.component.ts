import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { Persona } from '../../interfaces/persona.interface';
import { PersonaService } from '../../services/persona.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OptionsDialogComponent } from '../dialogs/optionsdialog/optionsdialog.component';
import { AdministracionService } from '../../services/administracion.service';
import { ConfirmDialogComponent } from '../dialogs/confirmdialog/confirmdialog.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  admin!: Persona;
  activo!: Persona;
  personasACargo: Persona[] = [];

  private _adminSelected!: Boolean; // Verificar si el usuario registrado es el paciente activo

  constructor(
    private authService: AuthService,
    private personaService: PersonaService,
    private administracionService: AdministracionService,
    private router: Router,
    private dialog: MatDialog
  ) {
    const adminString = localStorage.getItem('admin');
    if (adminString) {
      this.admin = JSON.parse(adminString);
    }
    const personaString = localStorage.getItem('persona');
    if (personaString) {
      this.activo = JSON.parse(personaString);
    }
  }

  ngOnInit() {
    this.admin === null
      ? this.router.navigate(['/'])
      : this.setPersonasACargo();

    this.admin.id === this.activo.id
      ? (this.adminSelected = true)
      : (this.adminSelected = false);

    localStorage.removeItem('paciente');
  }

  // Obtener lista de pacientes a cargo
  setPersonasACargo() {
    this.personaService.getPersonasACargo(this.admin.id).subscribe({
      next: (data) => {
        this.personasACargo = data;
      },
      error: (error) => {
        console.error('Error al obtener persona a cargo:', error);
      },
    });
  }

  // Acción en caso de pulsar boton de borrado
  onDelete(persona: Persona): void {
    this.administracionService
      .deleteAdministracion(this.admin.id, persona.id)
      .subscribe({
        next: (data) => {
          console.log('Administracion eliminada con exito: ' + data);
          this.deletePersona(data.idpaciente);
        },
        error: (error) => {
          console.error('Error al eliminar la administracion:', error);
        },
      });
  }

  deletePersona(persona: Persona) {
    this.personaService.deletePersona(persona.id).subscribe({
      next: (data) => {
        console.log('Persona eliminada con exito: ' + data);
        window.location.reload();
      },
      error: (error) => {
        console.error('Error al eliminar la persona:', error);
      },
    });
  }

  // Acción en caso de pulsar boton de edición
  onEdit(paciente: Persona): void {
    localStorage.setItem('paciente', JSON.stringify(paciente));
    this.router.navigate(['/updatePaciente']);
  }

  // Acción en caso de pulsar boton de cierre de sesión
  onLogout() {
    this.authService
      .logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => console.log(error));
  }

  // Abrir dialogo de opciones
  openDialogOptions(paciente: Persona) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true; // Solo se puede cerrar el dialogo pulsando en cancelar
    dialogConfig.autoFocus = false; // Desabilita el autoenfoque en un elemento concreto al abrir el dialogo

    dialogConfig.data = {
      // Datos que recibe el dialogo
      paciente: paciente,
    };

    dialogConfig.width = '400px';
    dialogConfig.panelClass = 'dialog-custom'; // Ajustar estilo del contenedor del dialogo

    const dialogRef = this.dialog.open(OptionsDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'delete') {
        // El usuario seleccionó la eliminación
        console.log('El usuario seleccionó la eliminación');
        //this.onDelete(paciente);
        this.openDialogDelete(paciente);
      } else if (result === 'edit') {
        // El usuario seleccionó la edición
        console.log('El usuario seleccionó la edición');
        this.onEdit(paciente);
      } else {
        // El usuario cerró el diálogo
        console.log('El usuario cerró el diálogo de opciones');
      }
    });
  }

  // Abrir dialogo de confirmación de borrado
  openDialogDelete(paciente: Persona) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true; // Solo se puede cerrar el dialogo pulsando en cancelar
    dialogConfig.autoFocus = false; // Desabilita el autoenfoque en un elemento concreto al abrir el dialogo

    dialogConfig.data = {
      // Datos que recibe el dialogo
      mensaje: '¿Desea eliminar el paciente?',
      paciente: paciente,
      idadmin: this.admin.id,
    };

    dialogConfig.width = '400px';
    dialogConfig.panelClass = 'dialog-custom'; // Ajustar estilo del contenedor del dialogo

    const dialogRef = this.dialog.open(ConfirmDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // El usuario confirmó la eliminación
        console.log('El usuario confirmó la eliminación');
        this.onDelete(paciente);
      } else {
        // El usuario canceló la eliminación
        console.log('El usuario canceló la eliminación');
      }
    });
  }

  toggleSelectPerson(paciente: Persona) {
    localStorage.setItem('persona', JSON.stringify(paciente));
    window.location.reload();
  }

  get adminSelected(): Boolean {
    return this._adminSelected;
  }

  set adminSelected(valor: Boolean) {
    this._adminSelected = valor;
  }
}
