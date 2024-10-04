import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CourseComponent } from './course/course.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { HomeComponent } from './home/home.component';
import { DocumentSearchComponent } from './document-search/document-search.component';
import { ProfileComponent } from './profile/profile.component';
import { CourseManagemenComponent } from './course-management/course-managemen.component';
import {AdminGuard} from "./admin.guard";
import {userGuard} from "./user.guard";

export const routes: Routes = [
  { path: 'course/:id', component: CourseComponent,canActivate: [userGuard] },
  { path: 'searchcourse/:section', component: CourseSearchComponent,canActivate: [userGuard] },
  { path: 'searchcourse', component: CourseSearchComponent,canActivate: [userGuard] },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent,canActivate: [userGuard] },

  {path:'profile',component:ProfileComponent,canActivate: [userGuard]},
  { path: 'searchDocuments', component: DocumentSearchComponent,canActivate: [userGuard] },
  { path: 'course-management', component: CourseManagemenComponent , canActivate: [AdminGuard]}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
