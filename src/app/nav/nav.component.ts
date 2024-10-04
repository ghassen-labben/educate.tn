import { Component, OnInit,  } from '@angular/core';
import { KeycloakService } from '../services/keycloak/keylock.service';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],

})
export class NavComponent implements OnInit{
  x=false;
  v=true;
  userprofileImage: any;
  isAdmin=false
  constructor(private keyckloakService:KeycloakService,private documentService:DocumentService)
  {

  }
  ngOnInit(): void {

    this.isAdmin=this.keyckloakService.roles.includes("ROLE_ADMIN")
    this.documentService.generatePresignedUrl("user_photos/"+this.keyckloakService.userProfile?.id).subscribe((data)=>{
      this.userprofileImage=data.url
    })  }
  isDropdownOpen = false;

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  logout() {
this.keyckloakService.logout().then(()=>{
  console.log("loged out")
})  }

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
