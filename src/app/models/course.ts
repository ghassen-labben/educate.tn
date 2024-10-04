import { Document } from "./Document";
import { Lecture } from "./Lecture";

export interface Course {
    id?: number;
    courseName: string;
    image?:string;
    instructor: string;
    major: string;
    lectures?: Lecture[];
    documents: Document[];
    numLectures?:number;
  isFavorite?:boolean;
  }
