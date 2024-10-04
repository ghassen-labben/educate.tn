// src/app/models/document.model.ts
export interface Document {
    id?: number;           // Optional because it might be auto-generated in the backend
    name: string;       // Name of the document
    type: string;       // Type of file (e.g., PDF, DOCX, etc.)
    url: string;       // Size of the file in KB
  }
  