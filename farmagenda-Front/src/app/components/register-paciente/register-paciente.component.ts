import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth-service.service';
import { Router } from '@angular/router';
import { Persona } from '../../interfaces/persona.interface';
import { PersonaService } from '../../services/persona.service';
import { v4 as uuidv4 } from 'uuid';
import { AdministracionService } from '../../services/administracion.service';

@Component({
  selector: 'app-register-paciente',
  templateUrl: './register-paciente.component.html',
  styleUrl: './register-paciente.component.css',
})
export class RegisterPacienteComponent implements OnInit {
  formReg: FormGroup;
  admin!: Persona;

  constructor(
    private router: Router,
    private personaService: PersonaService,
    private adminService: AdministracionService
  ) {
    this.formReg = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      nombre: new FormControl(''),
      telefono: new FormControl('', [Validators.maxLength(9)]),
    });
  }
  ngOnInit(): void {
    const adminString = localStorage.getItem('admin');
    if (adminString) {
      this.admin = JSON.parse(adminString);
    }
  }

  generarId(): string {
    // Generar el UUID
    let uuid = uuidv4();

    // Eliminar guiones del UUID
    uuid = uuid.replace(/-/g, '');

    // Truncar el UUID a un máximo de 30 caracteres
    return uuid.substring(0, 30);
  }

  //Crear usuario en bd
  createPaciente(): void {
    const persona: Persona = {
      id: this.generarId(),
      nombre: this.formReg.value.nombre,
      telefono: this.formReg.value.telefono === '' ? this.admin.telefono : this.formReg.value.telefono,
      email: this.formReg.value.email === '' ? this.admin.email : this.formReg.value.email
    };
    //console.log(persona);

    this.personaService.createPersona(persona).subscribe({
      next: (data) => {
        this.setAdmin(persona);
      },
      error: (error) => {
        console.error('Error al crear al paciente:', error);
      },
    });
  }

  //Asignar como administrado el usuario registrado actualmente
  setAdmin(persona: Persona): void {
    this.adminService.setAdmin(this.admin, persona).subscribe({
      next: (data) => {
        this.router.navigate(['/perfil']);
      },
      error: (error) => {
        console.error('Error al asignar administrador al paciente:', error);
      },
    });
  }
}
