import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

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
  login(email: string, password: string) {
    const res = this.httpClient.post('localhost:8080/user/login', {
      email,
      password,
    });
    return res;
  }
}
