import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { getKeycloak } from './keycloak.service';
import { environment } from '../../environments/environment'; // 👈 Importa la URL dinámica

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // ✅ Usa la URL según el entorno (local o producción)
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // ✅ Obtener usuario (desde backend temporal)
  getUsuario(): Observable<any> {
    return this.http.get(`${this.baseUrl}/usuario`);
  }

  // ✅ Subir archivo con token de Keycloak
  subirArchivo(formData: FormData): Observable<any> {
    const keycloak = getKeycloak();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${keycloak?.token || ''}`, // Evita error si no hay token aún
    });

    return this.http.post(`${this.baseUrl}/subir-archivo`, formData, { headers });
  }

  // ✅ Listar archivos (con autenticación)
  obtenerArchivos(): Observable<any> {
    const keycloak = getKeycloak();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${keycloak?.token || ''}`,
    });

    return this.http.get(`${this.baseUrl}/archivos`, { headers });
  }

  // ✅ Eliminar archivo (con autenticación)
  eliminarArchivo(tipo: string): Observable<any> {
    const keycloak = getKeycloak();

    const headers = new HttpHeaders({
      Authorization: `Bearer ${keycloak?.token || ''}`,
    });

    return this.http.delete(`${this.baseUrl}/archivo/${tipo}`, { headers });
  }
}
