import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {AddUserComponent} from "./add-user/add-user.component";
import {PostListComponent} from "./post-list/post-list.component";
import {AddPostComponent} from "./add-post/add-post.component";
import {ProfileComponent} from "./profile/profile.component";


const routes: Routes = [
  {
    path: '',
    component: PostListComponent
  },
  {
    path: 'users',
    component: UserListComponent
  },
  {
    path: 'add-user',
    component: AddUserComponent
  },
  {
    path: 'posts',
    component: PostListComponent
  },
  {
    path: 'add-post',
    component: AddPostComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
