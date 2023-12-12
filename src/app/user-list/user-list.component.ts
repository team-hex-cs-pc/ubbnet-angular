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
  filteredUsers : User[] = [];
  usernameQuery: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.getUsers();
  }

  async getUsers(): Promise<void> {
    try {
      const response: User[] = await lastValueFrom(this.userService.getUsers());
      this.users = response;
      this.filteredUsers = response;
    } catch (error: any) {
      console.error('Error fetching users:', error);
    }
  }

  goToProtectedPage() {
    this.router.navigate(['/protected']);
  }

  navigateToProfilePage(username: string) {
    this.router.navigate([`/profile/${username}`]);
  }

  searchUsers(): void {
    this.filteredUsers = this.users.filter((user) =>
      user.username.toLowerCase().includes(this.usernameQuery.toLowerCase()) ||
      user.firstName.toLowerCase().includes(this.usernameQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(this.usernameQuery.toLowerCase()))
      ;
  }

  filterUsers(): void{
    this.searchUsers();
  }

  // Function to clear filters and show all users
  clearFilters(): void {
    this.usernameQuery = '';
    this.filterUsers();
  }
}
