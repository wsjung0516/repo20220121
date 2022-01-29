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
      <div class="{{borderColor}}" (click)="selected.emit(originalImage)">
        <img #img >
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
  @Input() originalImage: ImageModel;
  @Output() selected: EventEmitter<ImageModel> = new EventEmitter<ImageModel>();
  // @SelectSnapshot(StatusState.getSelectedImageById) selectedImageId: ImageModel;
  borderColor!: string ;
  selectedImageId: ImageModel | undefined;
  constructor(
    private cdr: ChangeDetectorRef
  ) {
  }

  ngOnInit(): void {

  }
  ngAfterViewInit() {
    // @ts-ignore
    this.image.nativeElement.src = this.originalImage.blob;
    this.cdr.markForCheck();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.borderColor = 'none_selected_item'
    this.cdr.markForCheck();

    // @ts-ignore
    this.selectedImageId = JSON.parse(localStorage.getItem('selectedImageId'));
    // console.log('this.selectedImageId, this.originalImage.imageId ', this.selectedImageId, this.originalImage, changes)
    if( changes['addClass'] && changes['addClass'].currentValue) {
      if( this.selectedImageId.imageId === this.originalImage.imageId) {
        this.borderColor = 'selected_item';
        this.cdr.markForCheck();
      } else {
        this.borderColor = 'non_selected_item';
        this.cdr.markForCheck();
      }
    }
  }
}
