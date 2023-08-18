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

  // Public login function to get db data
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

  // Public register function to post db data
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

  // Public getSlots function to get db slots data
  public getSlots(id: string): Observable<any> {
    return this.http.get('/api/slots', {
      params: {
        entityId: id,
      },
    });
  }

  // Public getSpecialities function to get db specialities data
  public getSpecialities(): Observable<any> {
    return this.http.get('/api/specialities');
  }
}
