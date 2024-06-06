import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { Persona } from '../../interfaces/persona.interface';
import { PersonaService } from '../../services/persona.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WindowService } from '../../services/window.service';
import {
  Auth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from '@angular/fire/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  parentForm: FormGroup;
  formPhone: FormGroup;
  formCode: FormGroup;

  windowRef: any;
  showphoneform: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private personaService: PersonaService,
    private snackBar: MatSnackBar,
    private win: WindowService,
    private auth: Auth
  ) {
    this.parentForm = new FormGroup({
      email: new FormControl('', Validators.email),
      password: new FormControl('', [
        Validators.required,
        this.passwordValidator,
      ]),
      nombre: new FormControl('', Validators.required),
      telefono: new FormControl('', [
        Validators.maxLength(9),
        Validators.minLength(9),
      ]),
    });
    this.formPhone = new FormGroup({
      prefijo: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]+$'),
      ]),
      telefono: new FormControl('', [Validators.required]),
    });
    this.formCode = new FormGroup({
      code: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit() {
    this.windowRef = this.win.windowRef;
    this.windowRef.recaptchaVerifier = new RecaptchaVerifier(
      this.auth,
      'recaptcha-container',
      undefined
    );
    this.windowRef.recaptchaVerifier.render();
  }

  onSubmit() {
    if (this.parentForm.valid) {
      this.authService
        .register(this.parentForm.value)
        .then((response) => {
          this.createUser(response.user.uid);
        })
        .catch((error) => console.log('Register error: ' + error));
    }
  }

  onGoogleLogin() {
    this.authService
      .loginWithGoogle()
      .then((response) => {
        this.createUser(response.user.uid);
        //console.log(response)
      })
      .catch((error) => {
        console.log('Login error: ' + error);
        this.openSnackBar('Ha ocurrido un error. intentelo de nuevo');
      });
  }

  onPhoneLogin() {
    this.showphoneform = true;
  }

  sendLoginCode() {
    if (this.formPhone.valid) {
      const appVerifier = this.windowRef.recaptchaVerifier;
      appVerifier
        .verify()
        .then(() => {
          console.log('prueba');
          const prefijo = this.formPhone.get('prefijo')?.value;
          const telefono = this.formPhone.get('telefono')?.value;
          const num = `+${prefijo} ${telefono}`;

          signInWithPhoneNumber(this.auth, num, appVerifier)
            .then((result) => {
              this.windowRef.confirmationResult = result;
              this.showphoneform = false;
            })
            .catch((error) => {
              console.log(error);
              this.openSnackBar('Error, vuelva a intentarlo');
            });
        })
        .catch((error: any) => {
          console.error('Error al verificar el captcha:', error);
          this.openSnackBar('Error al verificar el captcha');
        });
    }
  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.formCode.get('code')?.value)
      .then((result: any) => {
        this.createUser(result.user);
        //console.log('usuario confirmado')
        console.log(result.user);
      })
      .catch((error: any) => {
        console.log(error, 'Codigo incorrecto');
        this.openSnackBar('Codigo incorrecto');
      });
  }

  //Crea usuario en bd y almacena en local de la app
  createUser(uid: string): void {
    const persona: Persona = {
      id: uid,
      nombre: this.parentForm.value.nombre,
      telefono: this.parentForm.value.telefono,
      email: this.parentForm.value.email,
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

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000, // Duración fija de 5 segundos
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    // Obtenemos el valor del control de formulario
    const value = control.value;
    // Si el valor está vacío, devolvemos un objeto de error indicando que el campo es requerido
    if (!value) {
      return { required: true };
    }

    // Comprobar si contiene al menos una letra mayúscula
    const hasUpperCase = /[A-Z]/.test(value);
    // Comprobar si contiene al menos una letra minúscula
    const hasLowerCase = /[a-z]/.test(value);
    // Comprobar si contiene al menos un número
    const hasNumber = /[0-9]/.test(value);
    // Comprobar si contiene al menos un carácter especial
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(value);
    // Comprobar si la longitud es de al menos 8 caracteres
    const isValidLength = value.length >= 8;

    // Usar todas las condiciones para comprobar la validez de la contraseña
    const passwordValid =
      hasUpperCase &&
      hasLowerCase &&
      hasNumber &&
      hasSpecialCharacter &&
      isValidLength;

    // Si la contraseña no es válida, devolvemos un objeto de error indicando que la contraseña es débil
    // De lo contrario, se devuelve `null` indicando que no hay errores
    return !passwordValid ? { passwordStrength: true } : null;
  }
}
