import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MembersService } from '../members.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  username: string = '';
  signupForm = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  constructor(private router: Router, private formBuilder: FormBuilder, private membersService: MembersService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    // Extract username from email
    const email = this.signupForm.value.email;

    const atIndex = email!.indexOf('@');
    const username = email!.substring(0, atIndex);

    // Add username to form data
    const formData = {
      ...this.signupForm.value,
      username: username
    };

    // Save member data to backend
    this.membersService.saveMemberData(formData).subscribe(() => {
      this.username = username;
      this.signupForm.reset();

      alert('Your assigned username is: ' + username);
      this.router.navigate(['/login']);
    });
  }
}
