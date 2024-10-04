import { Course } from "./course";
import { Lecture } from "./Lecture";

export interface User {
    profileImage: string;
    id: string;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    coursesEnrolled: Course[]; // Assuming you have a Course model
    lastWatchedLecture: Lecture | null; // Assuming you have a Lecture model
    lastWatchedMinute: number;
  }
