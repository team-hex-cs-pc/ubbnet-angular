import {LoginComponent} from './pages/login/login.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {PostListComponent} from "./post-list/post-list.component";
import {AddPostComponent} from "./add-post/add-post.component";
import {AuthGuard} from "./services/AuthGuard";


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
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
