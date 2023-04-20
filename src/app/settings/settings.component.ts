import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {

  constructor(private router: Router){}

  logout() {
    // Clear user data from local storage
    localStorage.removeItem('currentUser');
    // Navigate to the login page
    this.router.navigateByUrl('/login');
  }
}
