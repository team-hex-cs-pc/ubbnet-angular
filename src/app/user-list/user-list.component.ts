import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/user.service";
import {User} from "../user.model";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {}

  async ngOnInit(): Promise<void> {
    this.users = await this.userService.getUsers();
  }
}
