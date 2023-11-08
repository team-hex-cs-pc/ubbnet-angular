import {Component} from '@angular/core';
import {User} from "../user.model";
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss'],
})
export class AddUserComponent {
  user: User = {age: 0, email: "", gender: "", name: "", username: "", password: ""};

  constructor(private userService: UserService, private router: Router) {
  }

  async onSubmit() {
    this.userService.addUser(this.user).subscribe(
      (response: User) => {
        // Handle the success response here
        console.log('User added successfully', response);

        // Redirect to the "All Users" page
        this.router.navigate(['/users']);
      },
      (error) => {
        // Handle the error here
        console.error('Error while adding user', error);

        // Redirect to the "All Users" page
        this.router.navigate(['/users']);
      }
    );

  }

}
