import { Component, OnInit } from '@angular/core';
import { CourseService } from '../services/course.service';
import { Course } from '../models/course';
import { ActivatedRoute } from '@angular/router';
import { Section } from '../models/Section';
import {PaginatedResponse} from "../models/PaginatedResponse";
import {KeycloakService} from "../services/keycloak/keylock.service";

@Component({
  selector: 'app-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.scss']
})
export class CourseSearchComponent implements OnInit {
  courses!:PaginatedResponse<Course>
  section: string = '';
  searchTerm!:string;
  sections = Object.values(Section);

constructor(private CourseService:CourseService,private route:ActivatedRoute,private authservice:KeycloakService){}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.section = params.get('section')|| '';
    this.getCourses()
    });

  }
  getCoursesByUser() {
    if (this.authservice.userProfile) {
      this.CourseService.getCoursesByUserId(this.authservice.userProfile.id).subscribe((data) => {
        this.courses.content.forEach((course) => {
          // @ts-ignore
          data.map((caourse2)=>{
if(!course.isFavorite)
              course.isFavorite=course.id==caourse2.id
          })
        });
      });
    }
  }

  getCourses() {
    if (this.section) {
      this.CourseService.getCoursesBySection(this.section).subscribe((data) => {
        this.courses = data;
        this.getCoursesByUser();
      });
    } else {
      this.CourseService.getCourses().subscribe((data) => {
        this.courses = data;
        this.getCoursesByUser();
      });
    }
  }

  search(){
this.CourseService.searchCourses(this.searchTerm,0,20).subscribe((data)=>{
  this.courses=data

})
  }

  toggleFavorite(course: any) {
    this.CourseService.enrollCourse(course).subscribe((data)=>{
      course.isFavorite = !course.isFavorite;

    })
  }
}
