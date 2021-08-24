import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertifyjs.service';
import { AuthService } from '../_services/auth.service';
import { userService } from '../_services/user.service';

@Injectable()
export class MemberDetailsResolver implements Resolve<User> {
  constructor(
    private userService: userService,
    private alertify: AlertifyService,
    private authService: AuthService,
    private route: Router
  ) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): User | Observable<User> | Promise<User> {
    return this.userService.getUser(route.params['id']).pipe(
      catchError((error) => {
        this.alertify.error('server error');
        this.route.navigate(['/members']);
        return of(null);
      })
    );
  }
}
