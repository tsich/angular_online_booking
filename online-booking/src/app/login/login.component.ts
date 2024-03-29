import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { SharedService } from '../_services/shared-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loading = false;
  public loginForm!: FormGroup;

  constructor(
    private authenticationService: AuthenticationService,
    private _sharedService: SharedService
  ) {
    this._sharedService.emitOnFailedLogIn(false);
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      sin: new FormControl('', Validators.required),
    });
  }

  public onSubmit() {
    this.loading = true;
    this.authenticationService.login(
      this.loginForm.get('username')!.value,
      this.loginForm!.get('password')!.value,
      this.loginForm!.get('sin')!.value
    );
  }
}
