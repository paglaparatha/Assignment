import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private api: ApiService) {}

  canActivate(): boolean {
    if (this.api.user.value.phone) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
