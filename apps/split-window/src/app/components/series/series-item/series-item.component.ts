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
      <div class="{{borderColor}}" (click)="selected.emit(_seriesImage)">
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
export class SeriesItemComponent implements  AfterViewInit, OnChanges {
  @ViewChild('img') image?: ElementRef;
  @Input() set seriesImage (v: any) {
    this._seriesImage = v.series;
    if( this.image) {
      // console.log(' series_item seriesImage',v.series.seriesId)
      this.image.nativeElement.src = this._seriesImage.blob;
    }
    this.cdr.markForCheck();
  };
  // @Input() seriesImage: SeriesModel;
  @Input() set addClass( v: any){
    this.cdr.markForCheck();
  }
  @Output() selected: EventEmitter<any> = new EventEmitter();
  _seriesImage: SeriesModel;
  borderColor: any;
  selectedSeriesId: SeriesModel | undefined;
  constructor(private cdr: ChangeDetectorRef) { }
  ngAfterViewInit() {
    // console.log(' ---- series_item ngAfterViewInit is called', this.selectedSeriesId.category, this._seriesImage.category);
    this.image.nativeElement.src = this._seriesImage.blob;
  }

  ngOnChanges(changes: SimpleChanges) {
    this.borderColor = 'none_selected_item'
    this.cdr.markForCheck();

    // @ts-ignore
    const selectedId = localStorage.getItem('selectedSeriesId')
    this.selectedSeriesId = selectedId && JSON.parse(selectedId);
    // console. log('this.selectedImageId, this.originalImage.imageId ', this.selectedSeriesId.category, this._seriesImage.category)
    if( this.selectedSeriesId && changes['addClass'] && changes['addClass'].currentValue) {
     // console.log('series_Item changes', changes, this.selectedSeriesId.category, this._seriesImage.category)
      if( this.selectedSeriesId.category === this._seriesImage.category) {
        this.borderColor = 'selected_item';
        this.cdr.markForCheck();
      } else {
        this.borderColor = 'non_selected_item';
        this.cdr.markForCheck();
      }
    }
  }
}
