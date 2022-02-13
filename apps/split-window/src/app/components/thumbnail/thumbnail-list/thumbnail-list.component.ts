import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter,
  Injectable,
  Input, OnDestroy,
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
import {Select} from "@ngxs/store";
import {StatusState} from "../../../../state/status/status.state";
import {Observable, Subject, takeUntil} from "rxjs";
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
export class ThumbnailListComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() set selectedImage (v: any){
    if( v ) {
      v && this.onSelectItem(v.item);
      this.cdr.detectChanges();
    }
  };
  @Input() set currentImages (im:  any) {
    // console.log(' currentImages', im)
    this._currentImages = im;
    this.cdr.detectChanges();
  }
  @Output() selectItem = new EventEmitter<any>();
  @ViewChild(CdkVirtualScrollViewport, { static: true }) viewPort: CdkVirtualScrollViewport | undefined;
  @Select(StatusState.getSelectedImageById)  getSelectedImageById$: Observable<ImageModel>;
  _currentImages: any;
  unsubscribe = new Subject();
  unsubscribe$ = this.unsubscribe.asObservable();
  addClass: {} = {};
  draggedInx = 0;
  idx = 0;

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
      localStorage.setItem('selectedImageId', JSON.stringify({item: image}));

      this.cdr.detectChanges();
      // To synchronize with the current selected item, after when it is activated by clicking item-list
      setTimeout(() => this.viewPort.scrollToIndex(image.imageId, 'smooth'),200);
    })
    ///
  }
  ngAfterViewInit() {
    // Because of not focused with red border even though clicking item just after staring.
    setTimeout(()=> {
      this.addClass = {
        class: 'selected_item',
        index: 1
      }
    })
  }

  onSelectItem(ev:ImageModel) {
    if( !ev) return;

    // console.log( '--- thumbnail-list id', ev )
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
      this.cdr.detectChanges();
    },200);
  }
  ngOnDestroy() {
    this.unsubscribe.next({});
    this.unsubscribe.complete();
  }
}
