import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Injectable,
  Input,
  OnInit,
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
import {Select, Store} from "@ngxs/store";
import {Observable, Subject, takeUntil} from "rxjs";
import {StatusState} from "../../../../state/status/status.state";
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
  @Select(StatusState.getSelectedImageById)  getSelectedImageById$: Observable<ImageModel>;
  unsubscribe = new Subject();
  unsubscribe$ = this.unsubscribe.asObservable();
  addClass: {} = {};
  constructor(
    private cdr: ChangeDetectorRef,
    private store: Store
  ) { }

  ngOnInit(): void {
    const initial_value = {
      imageId: 0,
      category: 'animal',
      url: '',
      blob: 'assets/sample_images/100.jpg',
      title: ''
    }
    localStorage.setItem('selectedImageId', JSON.stringify(initial_value));
    ///
    /**
     * Triggered from series-list.component ( onSelectSeries),
     *      carousel.service (getPrevImage, getNextImage)
     */
    this.getSelectedImageById$.pipe(
      takeUntil(this.unsubscribe$)
    ).subscribe( image => {
      this.addClass = {
        class:'selected_item',
        imageId: image.imageId
      }
      this.cdr.detectChanges();
      // To synchronize with the current selected item, after when it is activated by clicking item-list
      setTimeout(() => this.viewPort.scrollToIndex(image.imageId, 'smooth'),200);
    })

  }
  onSelectItem(ev:ImageModel) {
    if( !ev) return;

    // console.log( '--- thumbnail-list id', ev )
    localStorage.setItem('selectedImageId', JSON.stringify(ev));
    this.store.dispatch(new SetSelectedImageById(ev));
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
    this.store.dispatch(new SetSplitAction(false));

  }
  ngOnDestroy() {
    this.unsubscribe.next({});
    this.unsubscribe.complete();
  }
}
