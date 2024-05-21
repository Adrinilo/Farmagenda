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
  paciente!: Persona;
  buttonText: string = 'Registrar';
  titleText: string = 'Registro nuevo paciente';

  constructor(
    private router: Router,
    private personaService: PersonaService,
    private adminService: AdministracionService
  ) {
    const pacienteString = localStorage.getItem('paciente');
    if (pacienteString) {
      this.paciente = JSON.parse(pacienteString);
    }
    this.formReg = new FormGroup({
      email: new FormControl(this.paciente?.email || '', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
      ]),
      nombre: new FormControl(this.paciente?.nombre || ''),
      telefono: new FormControl(this.paciente?.telefono || '', [Validators.maxLength(9)]),
    });
  }
  ngOnInit(): void {
    const adminString = localStorage.getItem('admin');
    if (adminString) {
      this.admin = JSON.parse(adminString);
    }
    this.buttonText = this.paciente ? 'Editar' : 'Registrar';
    this.titleText = this.paciente ? 'Editar paciente' : 'Registro nuevo paciente';
  }

  generarId(): string {
    // Generar el UUID
    let uuid = uuidv4();

    // Eliminar guiones del UUID
    uuid = uuid.replace(/-/g, '');

    // Truncar el UUID a un máximo de 30 caracteres
    return uuid.substring(0, 30);
  }

  onSubmit(): void {
    if (this.paciente) {
      this.updatePaciente();
      //console.log('update')
    } else {
      this.createPaciente();
      //console.log('create')
    }
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

  //Actualizar un paciente existente
  updatePaciente(): void {
    const persona: Persona = {
      id: this.paciente.id,
      nombre: this.formReg.value.nombre,
      telefono: this.formReg.value.telefono === '' ? this.paciente.telefono : this.formReg.value.telefono,
      email: this.formReg.value.email === '' ? this.paciente.email : this.formReg.value.email
    };
    //console.log(persona);

    this.personaService.updatePersona(persona).subscribe({
      next: (data) => {
        console.log('Persona actualizada con exito:', data);
        this.router.navigate(['/perfil']);
      },
      error: (error) => {
        console.error('Error al crear al paciente:', error);
      },
    });
  }
}
