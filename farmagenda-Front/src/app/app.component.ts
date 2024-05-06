import { Component, OnInit } from '@angular/core';
import { PersonaService } from './services/persona.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'farmagenda-front';

  persona: number;

  constructor(private personaService: PersonaService, private router: Router) {
    this.persona = 1;
  }

  ngOnInit(): void {
    this.personaService.getPersonaById(this.persona).subscribe({
      next: (data) => {
        localStorage.setItem('persona', JSON.stringify(data));
      },
      error: (error) => {
        console.error('Error al obtener la persona:', error);
        localStorage.removeItem('persona');
        this.router.navigate(['/login']);
      },
    });
  }
}
