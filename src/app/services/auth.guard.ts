import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { getKeycloak } from './keycloak.service'; // ✅ correcto

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const keycloak = getKeycloak(); // ✅ obtenemos la instancia

    if (keycloak && keycloak.authenticated) {
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
