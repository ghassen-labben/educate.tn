import { Component, ElementRef, HostListener, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-document-search',
  templateUrl: './document-search.component.html',
  styleUrls: ['./document-search.component.scss']
})
export class DocumentSearchComponent {
  @ViewChild('container', { static: true }) containerRef!: ElementRef;

  cards = [
    {
      title: 'Card 1',
      description: 'This is the first card.',
    },
    {
      title: 'Card 2',
      description: 'This is the second card.',
    },
    {
      title: 'Card 3',
      description: 'This is the third card.',
    },
    {
      title: 'Card 3',
      description: 'This is the third card.',
    },
    {
      title: 'Card 3',
      description: 'This is the third card.',
    },
    {
      title: 'Card 3',
      description: 'This is the third card.',
    },
    {
      title: 'Card 3',
      description: 'This is the third card.',
    },
    {
      title: 'Card 3',
      description: 'This is the third card.',
    },
    {
      title: 'Card 3',
      description: 'This is the third card.',
    },
    {
      title: 'Card 3',
      description: 'This is the third card.',
    },
    {
      title: 'Card 3',
      description: 'This is the third card.',
    },
    {
      title: 'Card 3',
      description: 'This is the third card.',
    },
  ];
  slideIndex = 0;
  cardWidth = 320;
  cardMargin = 10;
  containerWidth!: number;
  containerOffsetX!: number;
  isDragging = false;
  dragStartX!: number;
  dragOffsetX!: number;

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    this.containerWidth = this.containerRef.nativeElement.offsetWidth;
    this.containerOffsetX = this.containerRef.nativeElement.offsetLeft;
  }

  get totalPages(): number {
    return Math.ceil(this.cards.length * this.cardWidth / (this.containerWidth - this.cardMargin));
  }

  get overflowWidth(): string {
    return `${(this.cardWidth + this.cardMargin) * this.cards.length}px`;
  }

  get pagePosition(): string {
    const position = this.slideIndex * (this.cardWidth + this.cardMargin) + this.dragOffsetX;
    return `calc(-${position}px)`;
  }

  changePage(step: number) {
    this.slideIndex = (this.slideIndex + step + this.totalPages) % this.totalPages;
  }

  onMouseDown(event: MouseEvent) {
    if (event.button === 0) {
      this.isDragging = true;
      this.dragStartX = event.clientX;
      this.renderer.addClass(this.containerRef.nativeElement, 'grabbing');
    }
  }

  onMouseUp(event: MouseEvent) {
    if (this.isDragging && event.button === 0) {
      this.isDragging = false;
      this.dragOffsetX = 0;
      this.renderer.removeClass(this.containerRef.nativeElement, 'grabbing');
    }
  }

  onMouseMove(event: MouseEvent) {
    if (this.isDragging) {
      const dragDistance = event.clientX - this.dragStartX;
      const maxOffsetX = this.containerWidth - (this.cardWidth + this.cardMargin) * this.cards.length;

      if (dragDistance < maxOffsetX) {
        this.dragOffsetX = maxOffsetX;
      } else if (dragDistance > 0) {
        this.dragOffsetX = 0;
      } else {
        this.dragOffsetX = dragDistance;
      }
    }
  }

}
