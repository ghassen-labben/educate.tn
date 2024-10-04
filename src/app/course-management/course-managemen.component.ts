import { Component, OnInit, HostListener } from '@angular/core';
import { Course } from 'src/app/models/course';
import { Document } from 'src/app/models/Document';
import { Lecture } from 'src/app/models/Lecture';
import { PaginatedResponse } from 'src/app/models/PaginatedResponse';
import { CourseService } from 'src/app/services/course.service';
import { DocumentService } from 'src/app/services/document.service';
import {Section} from "../models/Section";

@Component({
  selector: 'app-add-post',
  templateUrl: './course-management.component.html',
  styleUrls: ['./course-managemen.component.scss']
})
export class CourseManagemenComponent implements OnInit {
  courses!: PaginatedResponse<Course>;
  isEditing: boolean = false;
  file: File | null = null;
  course: Course = {
    courseName: '',
    instructor: '',
    major: '',
    lectures: [],
    documents: []
  };

  newLecture: Lecture = {
    title: '',
    description: '',
    duration: 0,
    videoLink: ''
  };

  loadingMoreCourses: boolean = false;
  hasMoreCourses: boolean = true;
  currentPage: number = 0;
  itemsPerPage: number = 10;
  sections = Object.values(Section);
  urlPattern = 'https?://.+';

  constructor(
    private courseService: CourseService,
    private documentService: DocumentService
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.loadingMoreCourses = true;
    this.courseService.getCourses(this.currentPage, this.itemsPerPage).subscribe(
      (response: PaginatedResponse<Course>) => {
        this.courses = response;
        this.hasMoreCourses = response.content.length === this.itemsPerPage;
        this.courses.content.map((data)=>{
          this.loadLectures(data);
        })
      },
      (error) => {
        console.error('Error fetching courses:', error);
      }
    );
  }


  loadMoreCourses(): void {
    if (this.loadingMoreCourses || !this.hasMoreCourses) return;
    this.currentPage++;
    this.loadCourses();
  }

  @HostListener('scroll', ['$event'])
  onScroll(event: Event): void {
    const element = event.target as HTMLElement;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.loadMoreCourses();
    }
  }

  loadLectures(course: Course): void {
    if (course.id) {
      this.courseService.getLecturesByCourseId(course.id).subscribe((lectures) => {
        course.lectures = lectures;
      });
    }
  }

  addLecture(): void {
    if (this.newLecture.title && this.course.lectures) {
      this.course.lectures.push({ ...this.newLecture });
      this.newLecture = { title: '', description: '', duration: 0, videoLink: '' };
    }
  }

  removeLecture(index: number): void {
    if (this.course.lectures) {
      this.course.lectures.splice(index, 1);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
    }
  }

  addDocument(): void {
    if (this.file && this.course.documents) {
      const document: Document = {
        name: this.file.name,
        type: this.file.type,
        url: 'files/' + this.file.name
      };

      this.documentService.createDoc(document).subscribe((createdDoc) => {
        if (createdDoc.id) {
          this.documentService.uploadFileToPath(this.file!, createdDoc.id.toString()).subscribe((data) => {
            document.id = createdDoc.id;
            document.url=data
            this.course.documents!.push(document);
            this.file = null;
          });
        }
      });
    }
  }

  removeDocument(index: number): void {
    if (this.course.documents) {
      this.course.documents.splice(index, 1);
    }
  }

  onSubmit(): void {
    this.courseService.createCourse(this.course).subscribe(response => {
      console.log('Course added successfully', response);
      this.resetCourse();
    });
  }

  resetCourse(): void {
    this.course = {
      courseName: '',
      instructor: '',
      major: '',
      lectures: [],
      documents: []
    };
  }

  editCourse(course: Course): void {
    this.course = { ...course };
    this.isEditing = true;
  }

  cancelEdit(): void {
    this.isEditing = false;
    this.resetCourse();
  }

  deleteCourse(course: Course): void {
    if(course.id)
    this.courseService.deleteCourse(course.id).subscribe((data)=>{
      if (this.courses.content) {
        this.courses.content = this.courses.content.filter(c => c !== course);
      }
    })

  }
}
