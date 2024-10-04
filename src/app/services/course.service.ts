import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { KeycloakService } from './keycloak/keylock.service';
import {PaginatedResponse} from "../models/PaginatedResponse";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private apiUrl = 'http://localhost:8085/api/courses';

  getLecturesByCourseId(id: number) {
    const headers = this.getHttpHeaders();
    return this.http.get<any>(`${this.apiUrl}/lectures/${id}`, { headers });

  }

  getDocumentsByCourseId(id: number) {
    const headers = this.getHttpHeaders();
    return this.http.get<any>(`${this.apiUrl}/documents/${id}`, { headers });

  }
  searchCourses(query: string | null, page: number, size: number): Observable<PaginatedResponse<Course>> {
    const params = new HttpParams()
      .set('query', query || '')
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedResponse<Course>>(`${this.apiUrl}/search`, {
      params,
      headers: this.getHttpHeaders()
    });
  }
  constructor(private http: HttpClient, private authService: KeycloakService) { }
  private getHttpHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getCourses(page: number = 0, pageSize: number = 10): Observable<PaginatedResponse<Course>> {
    const headers = this.getHttpHeaders();
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    return this.http.get<PaginatedResponse<Course>>(this.apiUrl, { headers, params });
  }
  getCoursesBySection(section: string | null = null): Observable<PaginatedResponse<Course>> {
    const headers = this.getHttpHeaders();

    return this.http.get<PaginatedResponse<Course>>(this.apiUrl+'/'+section, { headers });


  }

  getCourseById(id: number): Observable<Course> {
    const headers = this.getHttpHeaders();
    return this.http.get<Course>(`${this.apiUrl}/${id}`, { headers });
  }

  createCourse(course: Course): Observable<Course> {
    const headers = this.getHttpHeaders();
    return this.http.post<Course>(this.apiUrl, course, { headers });
  }

  updateCourse(id: number, course: Course): Observable<Course> {
    const headers = this.getHttpHeaders();
    return this.http.put<Course>(`${this.apiUrl}/${id}`, course, { headers });
  }

  deleteCourse(id: number): Observable<void> {
    const headers = this.getHttpHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }


  enrollCourse(course: any) {
    const headers = this.getHttpHeaders();
    // @ts-ignore
    return this.http.post<string>(`${this.apiUrl}/${course.id}/enroll`, {}, { headers,responseType: 'text'  });

  }

  getCoursesByUserId(id: string | undefined) {
    const headers = this.getHttpHeaders();
    return this.http.get<Course[]>(`${this.apiUrl}/user/${id}`, { headers });
  }
}
