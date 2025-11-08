import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  template: `
    <div class="login-container">
      <h2>Inicio de sesión</h2>
      <form (ngSubmit)="login()">
        <input [(ngModel)]="username" name="username" placeholder="Usuario" required />
        <input [(ngModel)]="password" name="password" type="password" placeholder="Contraseña" required />
        <button type="submit">Entrar</button>
      </form>
      <p *ngIf="error" class="error">{{ error }}</p>
    </div>
  `,
  styles: [`
    .login-container {
      max-width: 300px;
      margin: 80px auto;
      display: flex;
      flex-direction: column;
      gap: 10px;
    }
    .error { color: red; }
  `]
})
export class LoginComponent {
  username = '';
  password = '';
  error = '';

  constructor(private http: HttpClient) {}

  login() {
    this.http.post('http://localhost:3000/api/login', { username: this.username, password: this.password })
      .subscribe({
        next: (data: any) => {
          localStorage.setItem('token', data.access_token);
          window.location.href = '/dashboard'; // redirige después del login
        },
        error: () => this.error = 'Usuario o contraseña incorrectos'
      });
  }
}
