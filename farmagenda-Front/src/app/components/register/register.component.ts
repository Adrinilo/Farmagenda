import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { Persona } from '../../interfaces/persona.interface';
import { PersonaService } from '../../services/persona.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  parentForm: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private personaService: PersonaService
  ) {
    this.parentForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      nombre: new FormControl(''),
      telefono: new FormControl('', [
        Validators.maxLength(9),
      ]),
    });
  }

  onSubmit() {
    this.authService
      .register(this.parentForm.value)
      .then((response) => {
        this.createUser(response.user.uid);
      })
      .catch((error) => console.log('Register error: ' + error));
  }

  //Crea usuario en bd y almacena en local de la app
  createUser(uid: string): void {
    const persona: Persona = {
      id: uid,
      nombre: this.parentForm.value.nombre,
      telefono: this.parentForm.value.telefono,
      email: this.parentForm.value.email
    };

    this.personaService.createPersona(persona).subscribe({
      next: (data) => {
        // Registro de paciente activo
        localStorage.setItem('persona', JSON.stringify(data));
        // Registro de persona logueada
        localStorage.setItem('admin', JSON.stringify(data));
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error al crear la persona:', error);
      },
    });
  }
}
