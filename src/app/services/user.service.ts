import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {User} from "../user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersUrl = 'http://localhost:8080/user';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    const url = `${this.usersUrl}/all`;
    return this.http.get<any[]>(url);
  }

  addUser(user: User): Observable<User> {
    const url = `${this.usersUrl}/add`;
    return this.http.post<User>(url, user);
  }
}
