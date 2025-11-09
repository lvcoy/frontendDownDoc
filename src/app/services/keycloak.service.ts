import Keycloak, { KeycloakInstance } from 'keycloak-js';

let keycloak: KeycloakInstance;

export const initKeycloak = (): Promise<KeycloakInstance> => {
  keycloak = new (Keycloak as any)({
    url: 'https://keycloak-cloud.onrender.com',
    realm: 'postulaciones',
    clientId: 'frontend-angular',
  });

  return keycloak
    .init({
      onLoad: 'login-required',
      checkLoginIframe: false,
      pkceMethod: 'S256',
      silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html'
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
  keycloak.logout({ redirectUri: window.location.origin });
};

export const getKeycloak = () => keycloak;
