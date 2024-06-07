import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  admin!: String;

  constructor(private snackBar: MatSnackBar) {
    const adminString = localStorage.getItem('admin');
    if (adminString) {
      this.admin = JSON.parse(adminString).nombre;
    }
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'Cerrar', {
      duration: 5000, // Duración fija de 5 segundos
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
    });
  }

  onClickAjustes() {
    this.openSnackBar('Apartado no disponible');
  }
}
