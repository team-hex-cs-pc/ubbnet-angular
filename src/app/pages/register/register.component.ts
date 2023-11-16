import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  user: any = {};

  constructor(private userService: UserService, private router: Router) {}

  async register(): Promise<void> {
    try {
      await this.userService.registerUser(this.user);
      await this.router.navigate(["/login"]);
    } catch (error) {
      console.error('Registration failed!', error);
    }
  }
}
