import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseManagemenComponent } from './course-managemen.component';

describe('AddPostComponent', () => {
  let component: CourseManagemenComponent;
  let fixture: ComponentFixture<CourseManagemenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CourseManagemenComponent]
    });
    fixture = TestBed.createComponent(CourseManagemenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
