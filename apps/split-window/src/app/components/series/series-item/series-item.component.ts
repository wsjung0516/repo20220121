import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter, Input,
  OnChanges,
  OnInit, Output,
  SimpleChanges, ViewChild
} from '@angular/core';
// @ts-ignore
import {ImageModel, SeriesModel} from "@repo20220121/data";

@Component({
  selector: 'series-item',
  template: `
    <div class="mb-1 w-auto">
      <div class="{{borderColor}}" (click)="selected.emit(seriesImage)">
        <img #img>
      </div>
    </div>
  `,
  styles: [`
    img {
      /*width: 145px;*/
      width: auto;
      height:100px;
      object-fit: fill;
    }
    .selected_item {
      width: auto;
      border: blue solid 4px ;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush})
export class SeriesItemComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('img') image?: ElementRef;
  @Input() seriesImage: SeriesModel;
  @Input() set addClass( v: any){
    this.cdr.markForCheck();
  }
  @Output() selected: EventEmitter<any> = new EventEmitter();

  borderColor: any;
  selectedSeriesId: SeriesModel | undefined;
  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    // @ts-ignore
    this.image.nativeElement.src = this.seriesImage.blob;
    this.cdr.markForCheck();
  }

  ngOnChanges(changes: SimpleChanges) {
    // console.log('changes', changes)
    this.borderColor = 'none_selected_item'
    this.cdr.markForCheck();

    // @ts-ignore
    this.selectedSeriesId = JSON.parse(localStorage.getItem('selectedSeriesId'));
    // console.log('this.selectedImageId, this.originalImage.imageId ', this.selectedImageId, this.originalImage, changes)
    if( this.selectedSeriesId && changes['addClass'] && changes['addClass'].currentValue) {
      if( this.selectedSeriesId.seriesId === this.seriesImage.seriesId) {
        this.borderColor = 'selected_item';
        this.cdr.markForCheck();
      } else {
        this.borderColor = 'non_selected_item';
        this.cdr.markForCheck();
      }
    }
  }
}
