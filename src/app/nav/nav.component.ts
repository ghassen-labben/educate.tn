import { Component,  } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
 
})
export class NavComponent {
  x=false;
  v=true;
  
 

  open()
  {
    if(this.x==false)
    {
      this.x=true;
    }
    else{
      this.x=false;
  }
  }
}
