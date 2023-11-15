import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import {User} from "../../models/User";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}
  errorAfterLogin: string = '';

  async login(email: string, password: string) {
    try {
      const res = await this.userService.login(email, password);
      if (res) {
        this.errorAfterLogin = '';

        localStorage.setItem('token', res.token);
        await this.userService.getUserInformation();
        localStorage.setItem('email', email);

        this.userService.setLoggedIn(true);

        await this.router.navigate(['/posts']); // navigate to desired route after successful login
        console.log('Login Successful!');
      } else {
        this.errorAfterLogin = 'Invalid email or password';
      }
    } catch (err: unknown) {
      this.errorAfterLogin = 'Invalid email or password';
    }
  }
}
