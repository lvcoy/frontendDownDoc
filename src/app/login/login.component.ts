// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { login } from '../services/keycloak.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  iniciarSesion() {
    login(); // 👈 llama a Keycloak
  }
}
