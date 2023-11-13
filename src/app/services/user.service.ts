import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, lastValueFrom } from 'rxjs';
import { AuthResponse } from '../models/AuthResponse';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private static _user = new BehaviorSubject<User | null>(null);

  httpClient: HttpClient;
  header = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
    }),
  };

  constructor(private http: HttpClient) {
    this.httpClient = http;
  }

  user$ = UserService._user.asObservable();

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

  async getUserInformation() {
    this.httpClient
      .get<User>('http://localhost:8080/user/details', {
        headers: new HttpHeaders({
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }),
      })
      .subscribe((user) => {
        UserService._user.next(user);
      });
  }
}
