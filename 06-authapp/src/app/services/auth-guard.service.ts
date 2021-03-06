import { Injectable } from "@angular/core";
import {
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  CanActivate
} from "@angular/router";
import { AuthService } from "./auth.service";
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    console.log(next);
    console.log(state);
    if (this.auth.isAuthenticated()) {
      return true;
    } else {
      return false;
    }
  }
}
