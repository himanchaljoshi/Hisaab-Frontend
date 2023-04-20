import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styleUrls: ['./login-signup.component.css']
})
export class LoginSignupComponent {

  constructor(private router: Router) {}

  onLoginClick(): void {
    this.router.navigateByUrl('/login');
  }
  onSignupClick(): void {
    this.router.navigateByUrl('/signup');
  }
}
