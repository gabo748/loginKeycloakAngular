import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post(`${this.apiUrl}/sign-in`, body);
  }

  signUp(email: string, password: string, firstName: string, lastName: string): Observable<any> {
    const body = { email, password, firstName, lastName };
    return this.http.post(`${this.apiUrl}/create-user`, body);
  }
}
