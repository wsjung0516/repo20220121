import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter,
  Injectable,
  Input,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import {SetSelectedImageById, SetSplitAction} from "../../../../state/status/status.actions";
// @ts-ignore
import {ImageModel} from "@repo20220121/data";
import {
  CdkVirtualScrollViewport,
  FixedSizeVirtualScrollStrategy,
  VIRTUAL_SCROLL_STRATEGY
} from "@angular/cdk/scrolling";
@Injectable()
export class CustomVirtualScrollStrategy extends FixedSizeVirtualScrollStrategy {
  constructor() {
    /** Below value is assumed, that could contain at most 100 image pixel data at one time.
     * If less than this value, the image data tend to be shuffled by sharing memory usage while scrolling  */
    super(90, 10000, 10000); // (itemSize, minBufferPx, maxBufferPx)
  }
}

@Component({
  selector: 'thumbnail-list',
  template: `
    <div class="mt-1">
      <div class="cdk-scroll-source" style="width: 99%">
        <cdk-virtual-scroll-viewport
          class="cdk-scroll-viewport"
          orientation="horizontal" >
          <ng-container *cdkVirtualFor="let item of _currentImages">
            <thumbnail-item [originalImage]="item"
                            [addClass]="addClass"
                            (selected) = onSelectItem($event)>
            </thumbnail-item>
          </ng-container>
        </cdk-virtual-scroll-viewport>
      </div>
    </div>  `,
  styles: [`
    .cdk-scroll-source {
      writing-mode: vertical-lr;
    }
    .cdk-scroll-source .cdk-scroll-viewport {
      height: 90px;
      width: 100%;
    }
    .cdk-scroll-source .cdk-scroll-viewport .cdk-virtual-scroll-content-wrapper {
      display: flex;
      flex-direction: row;
    }
  `],
  providers: [{provide: VIRTUAL_SCROLL_STRATEGY, useClass: CustomVirtualScrollStrategy}],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class ThumbnailListComponent implements OnInit {
  @Input() set selectedImage (v: any){
    console.log(' selectedImage',v)
    v && this.onSelectItem(v.item);
  };
  @Input() set currentImages (im:  any) {
    console.log('----------',im)
    this._currentImages = im;
  }
  @Output() selectItem = new EventEmitter<any>();
  @ViewChild(CdkVirtualScrollViewport, { static: true }) viewPort: CdkVirtualScrollViewport | undefined;
  _currentImages: any;
  addClass: {} = {};
  constructor(
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    const initial_value = {
      item: {
        imageId: 1,
        category: 'animal',
        url: '',
        blob: 'assets/sample_images/100.jpg',
        title: ''
      }
    }
    localStorage.setItem('selectedImageId', JSON.stringify(initial_value));
    ///
  }
  onSelectItem(ev:ImageModel) {
    if( !ev) return;

    console.log( '--- thumbnail-list id', ev )
    localStorage.setItem('selectedImageId', JSON.stringify({item:ev}));
    this.selectItem.emit(ev); // send to home.component
    /**
     * To synchronize with the current selected item, after when it is activated by clicking item-list
     * */
    setTimeout(() => {
      this.viewPort?.scrollToIndex(ev.imageId, 'smooth')
      this.addClass = {
        class: 'selected_item',
        index: ev.imageId
      }
    },200);
  }
}
