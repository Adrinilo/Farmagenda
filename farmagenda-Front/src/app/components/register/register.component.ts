import { Component, OnInit } from '@angular/core';
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
export class RegisterComponent implements OnInit {
  formReg: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    private personaService: PersonaService
  ) {
    this.formReg = new FormGroup({
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

  ngOnInit(): void {}

  onSubmit() {
    this.authService
      .register(this.formReg.value)
      .then((response) => {
        this.createUser(response.user.uid);
      })
      .catch((error) => console.log('Register error: ' + error));
  }

  //Crea usuario en bd y almacena en local de la app
  createUser(uid: string): void {
    const persona: Persona = {
      id: uid,
      nombre: this.formReg.value.nombre,
      telefono: this.formReg.value.telefono,
      email: this.formReg.value.email
    };

    this.personaService.createPersona(persona).subscribe({
      next: (data) => {
        localStorage.setItem('persona', JSON.stringify(data));
        this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error al crear la persona:', error);
      },
    });
  }
}
