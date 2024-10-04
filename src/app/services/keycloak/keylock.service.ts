import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './user-profile';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {
  private _profile: UserProfile | undefined;
  private _keycloak: Keycloak | undefined;
  private _roles: string[] = [];

  get userProfile() {
    return this._profile;
  }

  get roles() {
    return this._roles;
  }
  getToken(): string | undefined {
    return this.keycloak.token;
  }


  private get keycloak(): Keycloak {
    if (!this._keycloak) {
      this._keycloak = new Keycloak({
        url: 'http://localhost:8180',
        realm: 'seekmake-edu',
        clientId: 'sedu'
      });
    }
    return this._keycloak;
  }

  async init(): Promise<void> {
    console.log("Initializing Keycloak...");

    try {
      const authenticated = await this.keycloak.init({
        onLoad: 'login-required',
      });

      if (authenticated) {
        this._profile = await this.keycloak.loadUserProfile() as UserProfile;
        this._profile.token = this.keycloak.token;

        const tokenParsed = this.keycloak.tokenParsed;
        if (tokenParsed) {
          if (tokenParsed.realm_access && tokenParsed.realm_access.roles) {
            this._roles = tokenParsed.realm_access.roles; // Realm roles
          }

          if (tokenParsed.resource_access && tokenParsed.resource_access['sedu']) {
            const clientRoles = tokenParsed.resource_access['sedu'].roles;
            this._roles = [...this._roles, ...clientRoles]; // Merge client roles
          }
        }
      } else {
        console.log('User not authenticated');
      }
    } catch (error) {
      console.error('Keycloak initialization failed', error);
    }
  }


  login(): Promise<void> {
    return this.keycloak.login({
      redirectUri: 'http://localhost:4200'
    });
  }

  logout(): Promise<void> {
    return this.keycloak.logout({
      redirectUri: 'http://localhost:4200'
    });
  }

  constructor() { }
}
