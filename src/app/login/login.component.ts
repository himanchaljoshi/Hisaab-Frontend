import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model: any = {};
  getData: boolean = false;

  constructor(private router: Router, private memberService: MembersService) { }

  ngOnInit() {
  }

  loginMember() {
    if (!this.model.username || !this.model.password) {
      alert('Please enter a valid username and password.');
      return;
    }

    this.memberService.validateLogin(this.model.username, this.model.password).subscribe((response: boolean) => {
      this.getData = response;
      if (this.getData) {
        this.memberService.findUserByUsername(this.model.username).subscribe((user: any) => {
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.router.navigateByUrl('/dashboard');
        });
      } else {
        alert('Incorrect username or password. Please try again.');
      }
    });
  }
}
