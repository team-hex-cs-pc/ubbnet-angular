import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/User';
import { HttpErrorResponse } from '@angular/common/http';
import { FriendRequest } from 'src/app/models/FriendRequest';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  loggedInUser: User | null = null;
  posts: Post[] = [];
  friendRequest: FriendRequest | null = null;
  isFriend: boolean = false;
  username: string = '';

  constructor(
    private userService: UserService,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.userService.user$.subscribe((user) => {
      if (user) {
        this.loggedInUser = user;
      }
    });
  }

  async ngOnInit(): Promise<void> {
    const params = this.route.params.subscribe(async (params) => {
      const username = params['username'];
      this.username = username;
      const result = await this.userService.getUserByUsername(username);
      this.user = result;
      try {
        this.isFriend = await this.userService.isFriend(this.user.email);
        if (
          this.isFriend === false &&
          this.user.username !== this.loggedInUser?.username
        ) {
          this.friendRequest = await this.userService.hasFriendRequest(
            this.user.email
          );
        }
      } catch (error) {
        console.log(error);
      }
      const posts = await this.postService.getPostsByUsername(username);
      this.posts = posts;
    });
  }

  async sendFriendRequest(): Promise<void> {
    if (
      this.user === null ||
      this.loggedInUser === null ||
      this.friendRequest !== null
    )
      return;
    try {
      if (
        this.user !== null &&
        this.friendRequest === null &&
        this.loggedInUser !== null
      ) {
        await this.userService.sendFriendRequest(this.user.email);
        this.friendRequest = {
          senderUsername: this.loggedInUser.username,
          receiverUsername: this.user.username,
        };
        console.log('Friend request sent');
      }
    } catch (error: unknown) {
      console.log((error as HttpErrorResponse).error);
    }
  }

  async cancelFriendRequest() {
    if (this.friendRequest !== null) {
      this.userService.cancelFriendRequest(this.friendRequest.id!);
      this.isFriend = false;
      this.friendRequest = null;
    }
  }

  async acceptFriendRequest() {
    if (this.friendRequest !== null) {
      this.userService.acceptFriendRequest(this.friendRequest.id!);
      this.isFriend = true;
      this.friendRequest = null;
    }
  }
}
