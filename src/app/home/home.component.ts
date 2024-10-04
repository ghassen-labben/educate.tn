import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import KeenSlider, { KeenSliderInstance } from "keen-slider"
import { Section } from '../models/Section';
import {CourseService} from "../services/course.service";
import {KeycloakService} from "../services/keycloak/keylock.service";
import {UserService} from "../services/user.service";
declare var YT: any; // Declare YouTube global variable

// @ts-ignore
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit  {
  player: any;
  videoselected: any;

  sections = Object.values(Section);

sectionEnum = Section;
   light: boolean=false;
constructor(private userService:UserService,private authService:KeycloakService) {
}
  initYouTubePlayer(videoLink: string) {
    const videoId = this.getYouTubeVideoId(videoLink);
    this.player = new YT.Player('player', {

      videoId: videoId,

    });
  }
  getYouTubeVideoId(url: string): string | null {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  }
ngOnInit() {
  this.userService.getLastLectureByUser(this.authService.userProfile?.id).subscribe((data)=>{
    this.videoselected=data.videoLink
    this.initYouTubePlayer(this.videoselected)
  })
  setInterval(()=>{
    this.light=!this.light
  },800)
}
}
