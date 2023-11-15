import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {LoginComponent} from './pages/login/login.component';
import {MaterialModule} from './material.module';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {UserListComponent} from './user-list/user-list.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PostListComponent} from './post-list/post-list.component';
import {AddPostComponent} from './add-post/add-post.component';
import {TimeAgoPipe} from "./time-ago-pipe/time-ago-pipe.pipe";
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {CommonModule} from "@angular/common";

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    PostListComponent,
    AddPostComponent,
    TimeAgoPipe,
    LoginComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatListModule,
    AppRoutingModule,
    MaterialModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
