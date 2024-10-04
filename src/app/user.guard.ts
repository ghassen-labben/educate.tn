import {CanActivateFn, Router} from '@angular/router';
import { KeycloakService } from "./services/keycloak/keylock.service";
import {inject} from "@angular/core";
export const userGuard: CanActivateFn = async (route, state) => {
  const authService = inject(KeycloakService);
  const router = inject(Router);
  console.log('User Roles:', authService.roles);
  if (!authService.roles.includes("ROLE_ADMIN")) {
    return true;
  }
  router.navigate(["course-management"])
  return false;
};

