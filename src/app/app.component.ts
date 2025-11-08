import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ApiService } from './services/api.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule, MatCardModule, MatButtonModule, MatIconModule, MatProgressSpinnerModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  mensaje = '';
  cargando = false;
  usuario: any = null;
  archivos: any = {};
  folderId = '10-fCKfihG9IEczoccYb51gipbumg0Cgz';

  tiposDocs = [
    { key: 'documentoIdentidad', nombre: 'Documento de Identidad' },
    { key: 'homologacion', nombre: 'Formato de Homologación' },
    { key: 'seguro', nombre: 'Seguro Internacional' },
    { key: 'cartaAceptacion', nombre: 'Carta de Aceptación' },
    { key: 'cartaRecomendacion', nombre: 'Carta de Recomendación' },
  ];

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.cargarArchivos();
    this.cargarUsuario();
  }

  cargarUsuario() {
  this.api.getUsuario().subscribe({
    next: (res) => {
      console.log('Usuario recibido:', res);
      this.usuario = res;
    },
    error: (err) => {
      console.error('Error obteniendo usuario', err);
      this.usuario = { nombre: 'Usuario desconocido' };
    }
  });
}


  cargarArchivos() {
    this.api.obtenerArchivos().subscribe(data => this.archivos = data);
  }

  subirArchivo(event: Event, tipo: string) {
    const input = event.target as HTMLInputElement;
    if (!input.files || input.files.length === 0) return;

    const file = input.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folderId', this.folderId);
    formData.append('tipo', tipo);

    this.cargando = true;
    this.api.subirArchivo(formData).subscribe({
      next: res => {
        this.mensaje = res.message;
        this.cargarArchivos();
        this.cargando = false;
      },
      error: err => {
        this.mensaje = 'Error al subir: ' + err.message;
        this.cargando = false;
      }
    });
  }

  eliminarArchivo(tipo: string) {
    this.api.eliminarArchivo(tipo).subscribe({
      next: res => {
        this.mensaje = res.message;
        this.cargarArchivos();
      },
      error: err => this.mensaje = 'Error al eliminar: ' + err.message
    });
  }

  

}


// import { Component } from '@angular/core';
// import { CommonModule } from '@angular/common'; // ✅ para ngIf y ngFor
// import { HttpClientModule } from '@angular/common/http';
// import { FormsModule } from '@angular/forms'; // ✅ si usas ngModel
// import { ApiService } from './services/api.service';


// @Component({
//   selector: 'app-root',
//   standalone: true, // importante
//   imports: [CommonModule, HttpClientModule, FormsModule],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })



// export class AppComponent {
//   mensaje: string = '';

//   constructor(private api: ApiService) {}





//   subirArchivo(event: Event):void {
//     const input = event.target as HTMLInputElement;
//     if (!input.files || input.files.length === 0) return;

//     const file = input.files[0];
//     const folderId = '10-fCKfihG9IEczoccYb51gipbumg0Cgz';


//     const formData = new FormData();
//     formData.append('folderId', folderId);
//     formData.append('file', file);

//     this.api.subirPDFFormData(formData).subscribe({
//       next: res => this.mensaje = 'PDF subido con éxito',
//       error: err => this.mensaje = 'Error al subir PDF: ' + err.message
//     });


//   }

//   limpiar() {
//     this.mensaje = '';
//     // Opcional: limpiar el input si quieres
//     const input = document.querySelector('input[type=file]') as HTMLInputElement;
//     if (input) input.value = '';
//   }
// }
