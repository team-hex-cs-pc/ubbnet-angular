import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, lastValueFrom } from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  isLoggedIn: boolean;
  httpClient: HttpClient;
  header = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private http: HttpClient) {
    this.isLoggedIn = false;
    this.httpClient = http;
  }
  async login(email: string, password: string): Promise<AuthResponse> {
    const res = this.httpClient.post<AuthResponse>(
      'http://localhost:8080/user/login',
      {
        email,
        password,
      },
      this.header
    );
    return lastValueFrom(res);
  }
}
