// course.component.ts
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.scss']
})
export class CourseComponent {
  videoselected: any;
  playlist = [
    { name: 'Video 1', src: 'bN_-iradxRw' },
    { name: 'central ce', src: 'pSY3i5XHHXo' },
    { name: 'Video 3', src: 'VIDEO_ID_3' },
    { name: 'Video 4', src: 'VIDEO_ID_4' },
    { name: 'Video 4', src: 'VIDEO_ID_4' },
    { name: 'Video 4', src: 'VIDEO_ID_4' },
    { name: 'Video 4', src: 'VIDEO_ID_4' },
    { name: 'Video 4', src: 'VIDEO_ID_4' }
,
{ name: 'Video 4', src: 'VIDEO_ID_4' }

  ];
  constructor( private _sanitizer: DomSanitizer){
    this.videoselected = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/qQ40fDu007k');
  }
  changevideo(videoid:string )
  {
    this.videoselected = this._sanitizer.bypassSecurityTrustResourceUrl('https://www.youtube.com/embed/'+videoid);
  }
  v: boolean = true;

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
