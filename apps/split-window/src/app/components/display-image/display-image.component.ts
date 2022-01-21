import { Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'display-image',
  template: `
    <div>
      <div class="w-auto h-auto">
        <div class="text-lg">Display Image</div>
        <div class="m-1">
          <mat-progress-bar mode="determinate" [value]="progress"></mat-progress-bar>
        </div>
        <div class="">
          <div class="m-1">
            <img class="object-scale-down" [src]="imageSrc">
<!--            <img class="object-scale-down" #img>-->
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [
  ]
})
export class DisplayImageComponent  {
  @Input() progress: number = 0;
  @Input() imageSrc: string = '';

  @ViewChild('img') image?: ElementRef;
  constructor() {}


}
