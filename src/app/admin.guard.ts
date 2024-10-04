import {inject, Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivateFn} from '@angular/router';
import { KeycloakService } from './services/keycloak/keylock.service' // Adjust the import according to your structure

export const AdminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(KeycloakService);
  const router = inject(Router);

  console.log('User Roles:', authService.roles);
  if (authService.roles.includes("ROLE_ADMIN")) {
    return true;
  }
  router.navigate(["/"])

  console.log('Access denied. User does not have ROLE_USER.');
  return false;
};
