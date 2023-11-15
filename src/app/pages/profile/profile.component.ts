import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import {User} from "../../models/User";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User = {id: "", username: "", email: "", firstName: "", lastName: "", gender: "", birthday: ""};
  posts: Post[] = [];

  constructor(
    private userService: UserService,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    const params = this.route.params.subscribe(async (params) => {
      const username = params['username'];
      const result = await this.userService.getUserByUsername(username);
      this.user = result;

      const posts = await this.postService.getPostsByUsername(username);
      this.posts = posts;
    });
  }
}
