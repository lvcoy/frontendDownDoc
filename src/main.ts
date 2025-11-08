// import { bootstrapApplication } from '@angular/platform-browser'
// import { AppComponent } from './app/app.component'
// import { importProvidersFrom } from '@angular/core'
// import { HttpClientModule } from '@angular/common/http'

// bootstrapApplication(AppComponent, {
//   providers: [
//     importProvidersFrom(HttpClientModule)
//   ]
// })


import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app/app.routes';
import { RootComponent } from './app/root.component';
import { initKeycloak } from './app/services/keycloak.service'; // 👈 importante

// Espera a que Keycloak se inicialice antes de arrancar Angular
initKeycloak()
  .then(() => {
    return bootstrapApplication(RootComponent, {
      providers: [
        provideRouter(routes),
        provideHttpClient(),
      ],
    });
  })
  .catch((err) => {
    console.error('❌ Error iniciando la app con Keycloak:', err);
  });
