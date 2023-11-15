import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Post } from 'src/app/models/Post';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  posts: Post[] = [
    {
      category: 'category',
      content: 'asdasdasdas',
      likes: 1,
      title: 'jsdkjbfjds',
      publicationDate: '2021-10-10',
    },
    {
      category: 'category',
      content: 'asdasdasdas',
      likes: 1,
      title: 'jsdkjbfjds',
      publicationDate: '2021-10-10',
    },
    {
      category: 'category',
      content: 'asdasdasdas',
      likes: 1,
      title: 'jsdkjbfjds',
      publicationDate: '2021-10-10',
    },
  ];

  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  async ngOnInit(): Promise<void> {
    const params = this.route.params.subscribe(async (params) => {
      const result = await this.userService.getUserByUsername(
        params['username']
      );

      this.user = result;
    });
  }
}
