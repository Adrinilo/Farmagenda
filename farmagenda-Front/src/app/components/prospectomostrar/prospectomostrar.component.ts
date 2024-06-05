import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MedicinaService } from '../../services/medicina.service';

@Component({
  selector: 'app-prospectomostrar',
  templateUrl: './prospectomostrar.component.html',
  styleUrl: './prospectomostrar.component.css',
})
export class ProspectoMostrarComponent {
  contenido!: string;

  constructor(
    private route: ActivatedRoute,
    private medicinaService: MedicinaService
  ) {
    this.route.paramMap.subscribe((params) => {
      const nregistro = params.get('nregistro');
      if (nregistro) {
        this.obtenerProspecto(nregistro);
      }
    });
  }

  obtenerProspecto(url: string): void {
    this.medicinaService.obtenerProspecto(url).subscribe({
      next: (data) => {
        this.contenido = data;
        console.log('Prospecto:', data);
      },
      error: (error) => {
        console.error('Error al obtener html del prospecto:', error);
      },
    });
  }
}
