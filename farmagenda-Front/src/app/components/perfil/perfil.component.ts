import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { Persona } from '../../interfaces/persona.interface';
import { PersonaService } from '../../services/persona.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { OptionsDialogComponent } from '../dialogs/optionsdialog/optionsdialog.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  admin!: Persona;
  activo!: Persona;
  personasACargo: Persona[] = [];

  private _adminSelected!: Boolean;

  constructor(
    private authService: AuthService,
    private personaService: PersonaService,
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
  }

  setPersonasACargo() {
    this.personaService.getPersonasACargoById(this.admin.id).subscribe({
      next: (data) => {
        this.personasACargo = data;
      },
      error: (error) => {
        console.error('Error al obtener persona a cargo:', error);
      },
    });
  }

  onLogout() {
    this.authService
      .logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => console.log(error));
  }

  openDialogOptions(paciente: Persona) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = false;

    dialogConfig.data = {
      mensaje: '¿Desea eliminar el paciente?',
      paciente: paciente,
      idadmin: this.admin.id
    };

    dialogConfig.width = '400px';
    dialogConfig.panelClass = 'dialog-custom';

    const dialogRef = this.dialog.open(OptionsDialogComponent, dialogConfig);

    dialogRef.afterClosed().subscribe((result) => {
      if (result === true) {
        // El usuario confirmó la eliminación, puedes realizar acciones adicionales si es necesario
        console.log('El usuario confirmó la eliminación');
      } else {
        // El usuario canceló la eliminación, puedes realizar acciones adicionales si es necesario
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
