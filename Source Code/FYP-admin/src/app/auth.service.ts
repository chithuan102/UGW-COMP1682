import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AppCoreService } from './app.service';
import { UserService } from './user.service';
@Injectable({
  providedIn: 'root'
})
export class AuthenGuard implements CanActivate {
  currentUser;

  constructor(
    private router: Router, private coreService: AppCoreService, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    return new Promise(async (resolve) => {
      if (!localStorage.getItem('accessToken')) {
        this.router.navigate(['login']);
        return resolve(false);
      }
      this.currentUser = await this.userService.checkToken();
      if (this.currentUser) {
        return resolve(true);
      }
      return resolve(false);
    });


  }
}
