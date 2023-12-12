import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/services/user.service';

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
      this.errorAfterLogin = '';
      await this.userService.login(email, password);

      await this.router.navigate(['/posts']); // navigate to desired route after successful login
    } catch (err: any) {
      console.error({ err });
      this.errorAfterLogin = err.error ?? err.message ?? err;
    }
  }
}
