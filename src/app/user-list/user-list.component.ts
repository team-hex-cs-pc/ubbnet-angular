import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import { User } from '../models/User';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers(): Promise<void> {
    try {
      const response: User[] = await this.userService.getUsers();
      this.users = response;
    } catch (error: any) {
      console.error('Error fetching users:', error);
    }
  }

  goToProtectedPage() {
    this.router.navigate(['/protected']); // Navigate to the protected page
  }

  navigateToProfilePage(username: string) {
    this.router.navigate([`/profile/${username}`]); // Navigate to the profile page
  }
}
