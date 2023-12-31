import {LoginComponent} from './pages/login/login.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {PostListComponent} from "./post-list/post-list.component";
import {AddPostComponent} from "./add-post/add-post.component";
import {AuthGuard} from "./services/AuthGuard";
import { ProfileComponent } from './pages/profile/profile.component';
import {RegisterComponent} from "./pages/register/register.component";
import {MatNativeDateModule} from "@angular/material/core";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'posts',
    component: PostListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-post',
    component: AddPostComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile/:username',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    MatNativeDateModule
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
