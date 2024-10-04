import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { KeycloakService } from './keycloak/keylock.service';
import { Document } from '../models/Document';
import {PaginatedResponse} from "../models/PaginatedResponse";

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private apiUrl = 'http://localhost:8085/api/files'; // API endpoint
  private docUrl = 'http://localhost:8085/api/documents'; // API endpoint

  constructor(private http: HttpClient,private authService:KeycloakService) {

  }
  private getHttpHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }


  uploadFileToPath(file: File, path?: string ): Observable<string> {
    const headers = this.getHttpHeaders();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('filePath', path ||"default");

    return this.http.post(`${this.apiUrl}/upload/path`, formData, {
      headers: headers,
      responseType: 'text'
    });
  }

  generatePresignedUrl(objectPath: string): Observable<any> {
    const body = { objectPath: objectPath };
    const headers = this.getHttpHeaders();

    return this.http.post<any>(`${this.apiUrl}/generate-url`, body,{headers});
  }
  createDoc(document: Document): Observable<Document> {
    const headers = this.getHttpHeaders();
    return this.http.post<Document>(this.docUrl, document, { headers });
  }
  searchDocs(query: string | null, page: number, size: number): Observable<PaginatedResponse<Document>> {
    const params = new HttpParams()
      .set('query', query || '')
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PaginatedResponse<Document>>(`${this.docUrl}/search`, {
      params,
      headers: this.getHttpHeaders()
    });
  }
}
