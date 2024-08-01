import { Component } from '@angular/core';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent {
  showCategories = false;

  toggleCategories() {
    this.showCategories = !this.showCategories;
  }
}
