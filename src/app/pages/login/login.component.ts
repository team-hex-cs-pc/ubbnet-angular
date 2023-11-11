import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}
  errorAfterLogin: string = '';

  async login(username: string, password: string) {
    await this.userService
      .login(username, password)
      .then((res) => {
        if (res) {
          this.errorAfterLogin = '';
          localStorage.setItem('token', res.token);
        } else {
          this.errorAfterLogin = 'Invalid username or password';
        }
      })
      .catch((err: HttpErrorResponse) => {
        this.errorAfterLogin = 'Invalid username or password';
      });
  }
}
