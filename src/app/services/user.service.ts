import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../models/User';
import { KeycloakService } from './keycloak/keylock.service';
import { Course } from '../models/course';
import {Lecture} from "../models/Lecture";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8085/api/user';
  updateLastWatched(userId: string, lastWatchedLectureId: number, lastWatchedMinute: number): Observable<Course> {
    const headers = this.getHttpHeaders();
    const payload = {
      userId,
      lastWatchedLectureId,
      lastWatchedMinute
    };
    return this.http.put<Course>(`${this.apiUrl}/update-last-watched`, payload,{headers});
  }
  constructor(private http: HttpClient,private authService:KeycloakService) {}
  private getHttpHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  getLastLectureByUser(id: string | undefined) {
    const headers = this.getHttpHeaders();

    return this.http.get<Lecture>(this.apiUrl+'/lastwatched/'+id, { headers });
  }
  getByUsername(username: string): Observable<User> {
    const headers=this.getHttpHeaders()
    return this.http.get<User>(`${this.apiUrl}/${username}`,{headers}).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return throwError(() => new Error('User not found'));
        }
        return throwError(() => new Error('An error occurred'));
      })
    );
  }
  updateUser( id: string, user: User): Observable<any> {
    const headers=this.getHttpHeaders()
    return this.http.put(`${this.apiUrl}/update/${id}`, user, { headers });
}
getCoursesByUserId(userId: string): Observable<Course[]> {
  const headers=this.getHttpHeaders()

  const url = `http://localhost:8085/api/courses/user/${userId}`;
  return this.http.get<Course[]>(url,{headers});
}
}
