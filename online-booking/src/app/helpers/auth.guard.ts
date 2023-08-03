import { inject } from '@angular/core';
import { AuthenticationService } from './../_services/authentication.service';
import { SharedService } from './../_services/shared-service.service';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const authService = inject(AuthenticationService);
  const _sharedService = inject(SharedService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
  }
  console.log(authService.isLoggedIn());
  _sharedService.emitOnLoggedIn(authService.isLoggedIn());

  return true;
};

export const AuthGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => authGuard(route, state);
