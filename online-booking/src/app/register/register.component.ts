import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../_services/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})

// Register a new user
export class RegisterComponent {
  public registerForm!: FormGroup;

  constructor(private authenticationService: AuthenticationService) {}

  ngOnInit() {
    //  handle a reactive form with our controls
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      sin: new FormControl('', Validators.required),
    });
  }

  // onSubmitgets values from all controls and calls the register method in our AuthenticationService
  public onSubmit() {
    this.authenticationService.register(
      this.registerForm.get('username')!.value,
      this.registerForm.get('email')!.value,
      this.registerForm!.get('password')!.value,
      this.registerForm!.get('sin')!.value
    );
  }
}
