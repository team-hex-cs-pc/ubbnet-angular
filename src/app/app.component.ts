import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { UserService } from 'src/services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ubbnet-angular';

  constructor(private router: Router, private userService: UserService) {}

  goToProtectedPage() {
    this.router.navigate(['/protected']); // Navigate to the protected page
  }

  isLoggedIn() {
    return this.userService.isLoggedIn;
  }

  login() {
    this.router.navigate(["/login"]);
  }

  logout() {
    this.userService.logout();
  }
}
