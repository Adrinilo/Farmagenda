import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth-service.service';
import { Persona } from '../../interfaces/persona.interface';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css',
})
export class PerfilComponent {
  persona!: Persona;

  constructor(private authService: AuthService, private router: Router) {
    const personaString = localStorage.getItem('persona');
    if (personaString) {
      this.persona = JSON.parse(personaString);
    }
  }

  ngOnInit(): void {}

  onLogout() {
    this.authService
      .logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => console.log(error));
  }
}
