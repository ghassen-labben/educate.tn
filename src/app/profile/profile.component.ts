import { Component } from '@angular/core';
import { User } from '../models/User';
import { UserService } from '../services/user.service';
import { KeycloakService } from '../services/keycloak/keylock.service';
import { DocumentService } from '../services/document.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user!: User ;
  userCompletionPercentage=50;
  profileImageUrl: string | ArrayBuffer | null | undefined;
  constructor(private userService:UserService,private authService:KeycloakService,private documentService:DocumentService) {}
  ngOnInit(): void {
this.userService.getByUsername(this.authService.userProfile?.username || "").subscribe((data)=>{
  this.user=data
  this.userService.getCoursesByUserId(data.id).subscribe((data)=>{
    this.user.coursesEnrolled=data
  })
  this.documentService.generatePresignedUrl("user_photos/"+data.id).subscribe((data)=>{
    this.user.profileImage=data.url
  })
})
  }
  file!: File ;
  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      const reader = new FileReader();

      reader.onload = (e) => {
        this.profileImageUrl = e.target?.result ?? '';
      };

      reader.readAsDataURL(this.file);
    }
  }

  onSubmit(): void {
    if (!this.user || !this.user.id) {
      console.error('User information is missing');
      return;
    }

    if (!this.file) {
      console.error('No file selected');
      return;
    }

    this.userService.updateUser(this.user.id, this.user).subscribe({
      next: (data) => {
        console.log('User details updated:', data);
          this.uploadFile(this.file, this.user.id);
      },
      error: (err) => {
        console.error('Error updating user details:', err);
      },
    });
  }

  uploadFile(file: File, userId: string): void {
    this.documentService.uploadFileToPath(file, userId).subscribe({
      next: (data) => {
        console.log('File uploaded successfully:', data);
      },
      error: (err) => {
        console.error('Error uploading file:', err);
      },
    });
  }
}
