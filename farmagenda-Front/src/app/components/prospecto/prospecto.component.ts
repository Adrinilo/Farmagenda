import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MedResponse, Medicamento, createEmptyMedicamento } from '../../interfaces/medicamento.interface';
import { MedicinaService } from '../../services/medicina.service';

@Component({
  selector: 'app-prospecto',
  templateUrl: './prospecto.component.html',
  styleUrl: './prospecto.component.css'
})
export class ProspectoComponent {
  parentForm!: FormGroup;
  medSeleccionado: Medicamento = createEmptyMedicamento();

  constructor(
    private fb: FormBuilder
  ) {
    this.parentForm = this.fb.group({
      nombre: new FormControl(''),
      laboratorio: new FormControl('')
    });
  }

  onMedSelected(medicamento: Medicamento) {
    this.medSeleccionado = medicamento;
  }
}
