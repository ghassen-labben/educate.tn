import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PdfViewerModule } from 'ng2-pdf-viewer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { CourseSearchComponent } from './course-search/course-search.component';
import { CourseComponent } from './course/course.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatButtonModule} from '@angular/material/button';
import { DocumentSearchComponent } from './document-search/document-search.component';
import { KeycloakService } from './services/keycloak/keylock.service';
import { ProfileComponent } from './profile/profile.component';
import { CourseManagemenComponent } from './course-management/course-managemen.component';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import {AuthInterceptor} from "./services/keycloak/AuthInterceptor";

export function kcFactory(kcService:KeycloakService)
{
  return ()=>kcService.init();
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    CourseSearchComponent,
    CourseComponent,
    DocumentSearchComponent,
    ProfileComponent,
    CourseManagemenComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    PdfViewerModule],
  providers: [

    {

      provide:APP_INITIALIZER,//it will run when initialize the app
      deps:[KeycloakService],//dependecy injection
      useFactory:kcFactory,//it means that its a method
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
