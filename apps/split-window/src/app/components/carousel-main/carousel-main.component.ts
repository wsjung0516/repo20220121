import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'carousel-main',
  template: `
    <div>
      <div class="w-auto h-auto">
      <div class="text-lg">Carousel main</div>
    </div>
  `,
  styles: [
  ]
})
export class CarouselMainComponent implements OnInit {

  ngOnInit(): void {
  }
}
