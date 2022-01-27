import {ChangeDetectionStrategy, Component, Injectable, Input, OnInit, ViewChild} from '@angular/core';
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
    <div class="">
      <div class="cdk-scroll-source" style="width: 99%">
        <cdk-virtual-scroll-viewport
          class="cdk-scroll-viewport"
          orientation="horizontal" >
          <ng-container *cdkVirtualFor="let item of currentImages">
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
  @Input() set selectedImage (v: ImageModel){
    this.onSelectItem(v);
  };
  @Input() currentImages: ImageModel[] | undefined;
  @ViewChild(CdkVirtualScrollViewport, { static: true }) viewPort: CdkVirtualScrollViewport | undefined;
  addClass: {} = {};
  constructor() { }

  ngOnInit(): void {
  }
  onSelectItem(ev:ImageModel) {
    // console.log( '--- thumbnail-list id', ev.imageId )
    localStorage.setItem('selectedImageId', JSON.stringify(ev));
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
