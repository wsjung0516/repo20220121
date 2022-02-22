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
      border: red solid 4px ;
    }
  `],
   changeDetection: ChangeDetectionStrategy.OnPush}
)
export class SeriesItemComponent implements  AfterViewInit, OnChanges {
  @ViewChild('img') image?: ElementRef;
  @Input() set seriesImage (v: any) {
    // console.log(' series_item seriesImage',v)
    this._seriesImage = v;
    if( this.image) {
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
  onSelectedSeris(ev: any) {
    this.selected.emit(ev);
  }
  ngOnChanges(changes: SimpleChanges) {
    this.borderColor = 'none_selected_item'
    this.cdr.detectChanges();

    // @ts-ignore
    const selectedId = localStorage.getItem('selectedSeriesId')
    // console.log('selectedId', selectedId, this._seriesImage)
    this.selectedSeriesId = selectedId && JSON.parse(selectedId).series;
    // console. log('selectedImageId, ', this.selectedSeriesId.category, this._seriesImage.category)
    if( changes['addClass'] && changes['addClass'].currentValue) {
     // console.log('series_Item changes', changes, this.selectedSeriesId.category, this._seriesImage.category)
      if( this.selectedSeriesId.category === this._seriesImage.category) {
        this.borderColor = 'selected_item';
      } else {
        this.borderColor = 'non_selected_item';
      }
      this.cdr.detectChanges();
    }
  }
}
