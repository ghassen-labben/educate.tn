import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ForumComponent } from './forum/forum.component';
import { PostComponent } from './post/post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { DocumentSearchComponent } from './document-search/document-search.component';

const routes: Routes = [
  { path: 'course', component: CourseComponent },
  { path: 'searchcourse', component: CourseSearchComponent },
  { path: 'login', component: LoginComponent },
  { path: '', component: HomeComponent },
  { path: 'forum', component: ForumComponent },
  { path: 'post', component: PostComponent },
  { path: 'addpost', component: AddPostComponent },
  { path: 'searchDocuments', component: DocumentSearchComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
