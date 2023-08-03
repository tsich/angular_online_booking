import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationClient {
  // teams$: Observable<any> = this.http.get('/api/login');
  constructor(private http: HttpClient) {}

  public login(username: string, password: string): Observable<string> {
    // this.teams$.subscribe((res) => console.log(res));
    return this.http.get('/api/users', {
      params: {
        username: username,
        password: password,
      },
      responseType: 'text',
    });
  }

  public register(
    username: string,
    email: string,
    password: string
  ): Observable<string> {
    return this.http.post(
      '/api/users',
      {
        username: username,
        email: email,
        password: password,
      },
      { responseType: 'text' }
    );
  }
}
