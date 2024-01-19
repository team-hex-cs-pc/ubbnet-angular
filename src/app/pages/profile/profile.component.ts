import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { User } from '../../models/User';
import { HttpErrorResponse } from '@angular/common/http';
import { FriendRequest } from 'src/app/models/FriendRequest';
import { Reaction } from 'src/app/models/Reaction';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  newPost: Post | null | undefined = null;
  likeButtonColor: string = '';

  constructor(
    private userService: UserService,
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
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

  async likePost(post: any) {
    try {
      const user = await this.userService.getUserName()!;
      const reaction: Reaction = {
        postReference: post.postReference,
        userName: user,
        type: 'LIKE'
      }

      const response = await this.postService.likePost1(reaction);

      if (response) {
        const updatedPosts = await this.postService.getPostsByUsername(this.username);
        this.posts = updatedPosts;
        this.newPost = this.posts.find((p) => p.postReference === post.postReference);

        if (this.newPost) {
          if (this.newPost.likes > post.likes) {
            this.openSnackBar('Post liked successfully!', 'OK');
            this.likeButtonColor = 'liked-color';
          } else {
            this.openSnackBar('Post disliked successfully!', 'OK');
            this.likeButtonColor = 'default';
          }
        }
      }

    } catch (error: any) {
      console.error('Error fetching posts:', error);
    }
  }

  openSnackBar(message: string, action: string): void {
    this.snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
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
