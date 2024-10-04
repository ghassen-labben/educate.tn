import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';
import { DocumentService } from "../services/document.service";
import { PaginatedResponse } from "../models/PaginatedResponse";
import { Document } from "../models/Document";

@Component({
  selector: 'app-document-search',
  templateUrl: './document-search.component.html',
  styleUrls: ['./document-search.component.scss']
})
export class DocumentSearchComponent {
  @ViewChild('container', { static: true }) containerRef!: ElementRef;
  documents!: PaginatedResponse<Document>;
  searchTerm!: string;
  currentPage: number = 0;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.search();
  }

  search() {
    this.documentService.searchDocs(this.searchTerm, this.currentPage, 10).subscribe((data) => {
      this.documents = data;
    });
  }

  isPDFModalOpen = false;
  selectedDoc!: Document;

  selectDoc(doc: Document) {
    this.documentService.generatePresignedUrl(doc.url).subscribe((data) => {
      doc.url = data;
      this.selectedDoc = doc;
    });
    this.isPDFModalOpen = true;
  }

  closePDFModal() {
    this.isPDFModalOpen = false;
  }
  nextPage() {
      this.currentPage++;
      this.search();

  }

  previousPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.search();
    }
  }
}
