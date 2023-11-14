import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {BehaviorSubject, lastValueFrom} from 'rxjs';
import {User} from "../user.model";
import { AuthResponse } from '../models/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'http://localhost:8080/user';

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

  getUsers(): Promise<any[]> {
    const url = `${this.usersUrl}/all`;
    return lastValueFrom(this.http.get<any[]>(url));
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
