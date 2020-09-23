import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthuserService } from '../services/authuser-service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthuserService, private router: Router) {

  }

  canActivate(): boolean {
    if ( this.auth.stateUser() ) {
      return true;
    } else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
