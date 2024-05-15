import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { PersonaService } from '../../services/persona.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent{
  formLogin: FormGroup;
  error: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private personaService: PersonaService
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSubmit() {
    this.authService
      .login(this.formLogin.value)
      .then((response) => {
        //console.log(response.user.uid);
        this.onSuccess(response.user.uid)
      })
      .catch((error) => console.log('Login error: ' + error));
    }
    
    onSuccess(uid: string): void {
      this.personaService.getPersonaById(uid).subscribe({
        next: (data) => {
          localStorage.setItem('persona', JSON.stringify(data));
          localStorage.setItem('admin', JSON.stringify(data));
          this.router.navigate(['/']);
      },
      error: (error) => {
        console.error('Error al obtener la persona:', error);
        localStorage.removeItem('persona');
      },
    });
  }
}
