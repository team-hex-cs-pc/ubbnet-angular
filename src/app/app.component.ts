import { Component } from '@angular/core';
import {Router} from "@angular/router";
import { ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import {UserService} from "./services/user.service";

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
    return this.userService.isLoggedIn();
  }

  login() {
    this.router.navigate(["/login"]);
  }

  logout() {
    this.userService.logout();
  }

  async goToProfile() {
    const userEmail = localStorage.getItem('email'); // Retrieve the stored email
    if (userEmail) {
      try {
        const username = await this.userService.getUsernameByEmail(userEmail);
        if (username) {
          await this.router.navigate(['/profile', username]); // Navigate to the profile using the username
        } else {
          // Handle case where username is not found
          console.error('Username not found for the email:', userEmail);
        }
      } catch (error) {
        // Handle error fetching username
        console.error('Error fetching username:', error);
      }
    } else {
      // Handle case where email is not stored
      console.error('Email not found in localStorage');
    }
  }
}
