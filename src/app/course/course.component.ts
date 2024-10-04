import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../services/course.service';
import { DocumentService } from '../services/document.service';
import { Document } from '../models/Document';
import {UserService} from "../services/user.service";
import {KeycloakService} from "../services/keycloak/keylock.service";

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent implements OnInit {
  videoselected: any;
  playlist !:any[]
  documents !:any[]
  selectedDoc!: Document;

  constructor( private _sanitizer: DomSanitizer,private authService:KeycloakService,private userService:UserService,private route: ActivatedRoute,private courseService:CourseService,private documentService:DocumentService){
    this.videoselected = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/');
  }
  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id')) || 0;
    this.courseService.getDocumentsByCourseId(id).subscribe((data)=>{
this.documents=data
    })
    this.courseService.getLecturesByCourseId(id).subscribe((data)=>{
      this.playlist=data
      this.playlist.map((data)=>{
        data.videoId=this.getYouTubeVideoId(data.videoLink)
      })
    })
  }

   getYouTubeVideoId(url: string): string | null {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }

  changevideo(videoLink:string ,videoId:number)
  {
    this.userService.updateLastWatched(this.authService.userProfile?.id || '0' , videoId, 0)
      .subscribe(
        (updatedCourse) => {
          console.log('Updated Course:', updatedCourse);
        },
        (error) => {
          console.error('Error updating course:', error);
        }
      );    this.videoselected = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+this.getYouTubeVideoId(videoLink));
  }
  v: boolean = true;
  isPDFModalOpen=false
  selectDoc(doc:Document)
  {
    if(!this.selectedDoc)
    this.documentService.generatePresignedUrl(doc.url).subscribe((data)=>{
      doc.url=data
      this.selectedDoc=doc

    })
    this.isPDFModalOpen=true

  }
  closePDFModal()
  {
    this.isPDFModalOpen=false
  }
  open() {
    this.v = !this.v;

    const svg1 = document.getElementById('svg1');
    const svg2 = document.getElementById('svg2');
    svg1?.classList.add('svg-animation');
    svg2?.classList.add('svg-animation');
    setTimeout(() => {
      svg1?.classList.remove('svg-animation');
      svg2?.classList.remove('svg-animation');
    }, 500);
  }
}
