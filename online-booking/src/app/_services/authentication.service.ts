import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationClient } from '../clients/authentication.client';

@Injectable({
  providedIn: 'root',
})

// create service that login and register user using our client,
// stores token in the browser cache,
// logout and return information if the user is logged in
export class AuthenticationService {
  private tokenKey = 'token';

  constructor(
    private authenticationClient: AuthenticationClient,
    private router: Router
  ) {}

  // Generate a random string as a token for each user
  generateToken(n: number) {
    console.log(n);
    var chars =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$&';
    var token = '';
    for (var i = 0; i < n; i++) {
      token += chars[Math.floor(Math.random() * chars.length)];
    }
    return token;
  }

  // Public login function
  public login(username: string, password: string): void {
    // console.log(username + ' ' + password);
    this.authenticationClient.login(username, password).subscribe((data) => {
      console.log(JSON.parse(data));
      if (JSON.parse(data).length) {
        // Generate a token with a stable + random int length
        var token = this.generateToken(
          JSON.parse(data)[0].username.length +
            Math.floor(Math.random() * 10 + 2)
        );
        console.log(token);
        localStorage.setItem(this.tokenKey, token);
        localStorage.setItem('data', data);
        this.router.navigate(['/']);
      }
    });
  }

  // Public register function
  public register(username: string, email: string, password: string): void {
    this.authenticationClient
      .register(username, email, password)
      .subscribe((data) => {
        if (Object.keys(JSON.parse(data)).length) {
          var token = this.generateToken(
            JSON.parse(data)[0].username.length +
              Math.floor(Math.random() * 10 + 2)
          );
          localStorage.setItem(this.tokenKey, token);
          localStorage.setItem('data', data);
          this.router.navigate(['/']);
        }
      });
  }

  // Public logout function
  public logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('data');
    this.router.navigate(['/login']);
  }

  // Public isLoggedIn function to check if the user is logged in
  public isLoggedIn(): boolean {
    // console.log(localStorage);
    let token = localStorage.getItem(this.tokenKey);
    return token != null && token.length > 0;
  }

  // Public function to get the user's token from cache else return null
  public getToken(): string | null {
    // console.log(localStorage);
    return this.isLoggedIn() ? localStorage.getItem(this.tokenKey) : null;
  }
}
