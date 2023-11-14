import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {PostListComponent} from "./post-list/post-list.component";
import {AddPostComponent} from "./add-post/add-post.component";
import {ProfileComponent} from "./profile/profile.component";


const routes: Routes = [
  {
    path: '',
    component: PostListComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'users',
    component: UserListComponent
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
  exports: [RouterModule],
})
export class AppRoutingModule {}
