import Keycloak, { KeycloakInstance } from 'keycloak-js';

let keycloak: KeycloakInstance;

export const initKeycloak = (): Promise<KeycloakInstance> => {
  keycloak = new (Keycloak as any)({
    url: 'http://localhost:8080',   // servidor Keycloak
    realm: 'postulaciones',         // nombre del realm
    clientId: 'frontend-angular',   // ID del cliente
  });

  return keycloak
    .init({
      onLoad: 'login-required',     // login directo, evita el timeout
      checkLoginIframe: false,      // desactiva iframe problemático
      pkceMethod: 'S256',           // recomendado por seguridad
    })
    .then((authenticated: boolean) => {
      if (authenticated) {
        console.log('✅ Usuario autenticado:', keycloak.tokenParsed);
      } else {
        console.log('⚠️ Usuario no autenticado');
        keycloak.login();
      }
      return keycloak;
    })
    .catch((err: any) => {
      console.error('❌ Error iniciando Keycloak:', err);
      throw err;
    });
};

// Login y logout
export const login = () => {
  if (!keycloak) {
    console.error('❌ Keycloak no está inicializado todavía');
    return;
  }
  keycloak.login({ redirectUri: window.location.origin + '/home' });
};

export const logout = () => {
  if (!keycloak) return;
  keycloak.logout({ redirectUri: window.location.origin + '/login' });
};

// Obtener instancia
export const getKeycloak = () => keycloak;
