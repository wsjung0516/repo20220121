import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
// @ts-ignore
import {ImageModel} from '@repo20220121/data';
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";
import {StatusState} from "../../../../state/status/status.state";

@Component({
  selector: 'thumbnail-item',
  template: `
    <div class="mr-1">
      <div class="{{borderColor}}" (click)="selected.emit(_originalImage)">
        <img  #img >
      </div>
    </div>
  `,
  styles: [`
    img {
      width: 90px;
      height: 60px;
      object-fit: fill;
      background: antiquewhite;
    }
    .selected_item {
      width: auto;
      height: 68px;
      border: red solid 4px ;
    }
  `],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class ThumbnailItemComponent implements OnInit, AfterViewInit {
  @ViewChild('img') image?: ElementRef;
  @Input() set addClass( v: any){
    this.cdr.markForCheck();
  }
  @Input() set originalImage (v : any ) {
    this._originalImage = v.item;
    if( this.image && this.image.nativeElement) {
      // console.log(' thumbnail_item originalImage',v.item)
      this.image.nativeElement.src = this._originalImage.blob;
      this.cdr.markForCheck();
    }
  }
  @Output() selected: EventEmitter<ImageModel> = new EventEmitter<ImageModel>();
  borderColor!: string ;
  _originalImage: any;
  selectedImageId: ImageModel | undefined;
  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    // @ts-ignore
    // console.log(' thumbnail-item -- category',this._originalImage.category)
    this.image.nativeElement.src = this._originalImage.blob;
    this.cdr.markForCheck();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.borderColor = 'none_selected_item'
    this.cdr.markForCheck();

    // @ts-ignore
    this.selectedImageId = JSON.parse(localStorage.getItem('selectedImageId')).item;
    // console.log('data2 this.selectedImageId', changes['addClass'].currentValue.imageId, this.selectedImageId.imageId, this._originalImage.imageId)
    if( changes['addClass'] && changes['addClass'].currentValue) {
      // @ts-ignore
      if( this.selectedImageId.imageId === this._originalImage.imageId) {
        this.borderColor = 'selected_item';
      } else {
        this.borderColor = 'non_selected_item';
      }
      this.cdr.markForCheck();
    }
  }
}
