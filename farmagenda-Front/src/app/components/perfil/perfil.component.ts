import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { Persona } from '../../interfaces/persona.interface';
import { PersonaService } from '../../services/persona.service';

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
    private router: Router
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
