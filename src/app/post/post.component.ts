import { AfterViewInit, Component } from '@angular/core';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent    {
  likesCount = 0;
  dislikesCount = 0;

  increaseLikes() {
    this.likesCount++;
  }

  increaseDislikes() {
    this.dislikesCount++;
  }
 
}
