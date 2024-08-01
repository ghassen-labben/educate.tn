import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CourseComponent } from './course/course.component';
import { ForumComponent } from './forum/forum.component';
import { PostComponent } from './post/post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { HttpClientModule} from '@angular/common/http';
import { QuillModule } from 'ngx-quill'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatButtonModule} from '@angular/material/button';
import { DocumentSearchComponent } from './document-search/document-search.component';
import { BlogComponent } from './blog/blog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    LoginComponent,
    CourseSearchComponent,
    CourseComponent,
    ForumComponent,
    PostComponent,
    AddPostComponent,
    DocumentSearchComponent,
    BlogComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule ,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    QuillModule.forRoot(),
    MatButtonModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
