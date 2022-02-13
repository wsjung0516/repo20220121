import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import {CarouselService} from "../../../services/carousel.service";
import {ImageService} from "../../../services/image.service";
import {defer, EMPTY, Observable, of, Subject, zip} from "rxjs";
import {Select, Store} from "@ngxs/store";
// import {StatusState} from "../../../store/status/status.state";
import {
  SetCurrentCategory,
  SetCurrentSplitOperation,
  SetImageUrls,
  SetIsImageLoaded,
  SetSelectedSplitWindowId,
  SetSplitAction,
} from "../../../../state/status/status.actions";
import {filter, skip, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";
import {fromWorker} from "observable-webworker";
import {StatusState} from "../../../../state/status/status.state";
import {SeriesItemService} from "../../series/series-item.service";
import {CacheSeriesService} from "../../../services/cashe-series.service";
import {SplitService} from "../../../services/split.service";

// export const category_list = ['animal', 'house', 'baby', 'forest', 'happiness', 'love', 'sea','banana', 'mountain']
export interface ImageModel {
  imageId: number,
  category: string,
  url: string,
  blob: any,
  title: string
}

@Component({
  selector: 'app-carousel-main',
  template: `
    <div>
      <div class="w-auto h-auto">
        <div class="m-1">
          <mat-progress-bar mode="determinate" [value]="progress[categoryIdx]"></mat-progress-bar>
        </div>
        <div class="">
          <div class="m-1">
            <img class="object-scale-down" #img>
          </div>
        </div>
      </div>
    </div>

  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class CarouselMainComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() set queryElement(el: string) {
    // console.log('carousel-main input queryElement', el)
    let idx;
    if (el === 'element1') idx = 0;
    if (el === 'element2') idx = 1;
    if (el === 'element3') idx = 2;
    if (el === 'element4') idx = 3;

    this.makingSplitWindowByGrid(idx);
  }

  @ViewChild('img') image: ElementRef;
  // to check if image loading is started from webworker.
  @Select(StatusState.getIsImageLoaded) getIsImageLoaded$: Observable<any>;
  @Select(StatusState.getSelectedImageById) getSelectedImageById$: Observable<ImageModel>;
  @Select(StatusState.getSelectedSeriesById) getSelectedSeriesById$: Observable<number>;
  @Select(StatusState.getIsSeriesLoaded) getIsSeriesLoaded$: Observable<boolean>;
  //
  @SelectSnapshot(StatusState.getCurrentCategory) currentCategory: string;
  @SelectSnapshot(StatusState.getCategoryList) category_list: string[];
  @SelectSnapshot(StatusState.getWebworkerWorkingStatus) getWebworkerWorkingStatus: boolean;
  @Select(StatusState.getSeriesUrls) getSeriesUrls$: Observable<any>;
  @Select(StatusState.getSplitMode) splitMode$: Observable<any>;
  @SelectSnapshot(StatusState.getSplitMode) splitMode: number;
  @SelectSnapshot(StatusState.getSplitAction) splitAction: boolean;
  @SelectSnapshot(StatusState.getFocusedSplit) focusedSplitIdx: number;
  @Select(StatusState.getCurrentSplitOperation) getCurrentSplitOperation$: Observable<{}>;
  @Select(StatusState.getActiveSplit) activeSplit$: Observable<number>;
  @SelectSnapshot(StatusState.getSplitCategories) splitCategories: string[];


  worker: Worker[] = [];
  unsubscribe = new Subject();
  unsubscribe$ = this.unsubscribe.asObservable();
  _queryUrl: string;
  categoryIdx: any = 0;
  splitIdx = 0;
  imageCount: any[] = [];
  progress: string[] = [];
  originalImage: any;
  requestRenderingSplitWindow$: Observable<string>[] = [];
  selectedSplitWindow = new Subject<string>();
  tempObservable: Observable<any>;

  @HostListener('window:keydown', ['$event'])
  handleKey(event: KeyboardEvent) {
    if (event.key === 'ArrowRight') this.nextImage();
    if (event.key === 'ArrowLeft') this.prevImage();
    // console.log( 'key value',event.key);
  }

  constructor(
    private carouselService: CarouselService,
    private imageService: ImageService,
    private store: Store,
    private splitService: SplitService,
    private cdr: ChangeDetectorRef,
    private seriesItemService: SeriesItemService,
    private cacheSeriesService: CacheSeriesService,
  ) {}


  ngOnInit(): void {
    // call from thumbnail-list, triggered by clicking image item.
    // console.log('carousel-main Component ngOnInit')
    /**
     * Wait until displaying the first main image before series data is loaded
     * This first image is came from the series list not from thumbnail image,
     * because the thumbnail images are not ready to display
     * */
    this.getIsSeriesLoaded$.pipe(skip(1),takeUntil(this.unsubscribe$))
      .subscribe(() => {
        const tImage = this.carouselService.getSelectedImageById('animal', 0);
        this.displaySplitWindowImage(tImage)
      })

    this.splitWindowProcess1();
    this.splitWindowProcess2()

    /** Display image at the main window whenever clinking thumbnail_item */
    this.getSelectedImageById$.pipe(skip(1))
      .subscribe(image => {
        const img = this.carouselService.getSelectedImageById(image.category, image.imageId)
        this.displaySplitWindowImage(img);
      })

    /** New process start whenever clinking series_item */
    this.getSelectedSeriesById$.pipe(
      skip(1),
      takeUntil(this.unsubscribe$),
    ).subscribe((id: number) => {
      this.makingSplitWindowBySelectedSeries(id);
    });
  }

  private makingSplitWindowByGrid(eIdx: number) {
    const category = this.splitCategories[eIdx];
    this.splitIdx = eIdx;
    // console.log( ' cat5', category);
    this._queryUrl = `assets/json/${category}.json`;
    this.categoryIdx = this.category_list.findIndex(val => val === category);
    this.splitService.selectedElement = this.splitService.elements[eIdx];
    if (this.splitMode === 1) {
       this.splitService.resetSplitWindowProcessing();
    }
    this.requestRenderingSplitWindow$[this.splitService.selectedElement] = of(this.splitService.selectedElement).pipe(take(1));
    // console.log('-- requestRenderingSplitWindow$', this.requestRenderingSplitWindow$, this.splitService.selectedElement, eIdx);
  }

  private makingSplitWindowBySelectedSeries(cIdx: number) {
    const category = this.category_list[cIdx];
    //
    const queryUrl = `assets/json/${category}.json`;
    this.categoryIdx = this.category_list.findIndex(val => val === category);
    // console.log(' cat5 - 9 makingSplitWindowBySelectedSeries ',  this.category_list, cIdx, this.categoryIdx)
    this.makingSplitWindow(queryUrl, category);
  }

  private makingSplitWindow(queryUrl: string, category: string) {
    // console.log(' --- cat5 - 8  makingSplitWindow ', category);
    this.webWorkerProcess(category);
    this.getRemainedImageList(queryUrl);
    this.makeTheFirstImage(category);
  }


  private makeTheFirstImage(category: string) {
    this.getIsImageLoaded$ && this.getIsImageLoaded$.pipe(skip(1),take(1))
      .subscribe(async () => {
        /**
         * Finished drawing the first image of all the images that was read from Internet
         * based on the category.
         * Make the end signal and send it to the waiting state to make the next grid start to
         * drawing.
         * */
        await this.displayTheFirstImage(category);
        await this.signalFinished();
      })
  }

  private async signalFinished() {
    return new Promise(resolve => {
      this.splitService.isFinishedRendering[this.splitService.selectedElement].next(this.splitService.selectedElement)
      resolve('')
      setTimeout(() => {
        if(this.worker[this.splitIdx] ) {
          this.worker[this.splitIdx].terminate();
          this.worker[this.splitIdx] = undefined;
          // console.log(' terimnate this.worker[this.splitIdx] ', this.splitIdx)
        }
        // if(this.worker[this.splitIdx] && this.splitAction ) this.worker[this.splitIdx].terminate();
        /** Because each split window has it's own webworker, and this webworker will be remained
         *  if it is not terminated immediately */
      },5000);

    })
  }

  private async displayTheFirstImage(category: string) {
    return new Promise( resolve => {
        this.splitService.isStartedRendering[this.splitService.selectedElement].next(this.splitService.selectedElement)
        /**
         * When change split mode, if image is not in the cached (based on category)
         * then borrow image from series list, which is already cached.
         * This technique is needed because image should be displayed immediately
         */
        // const tImage = this.carouselService.getSelectedImageById(this.category, 0);
        const tImage = this.carouselService.getSelectedImageById(category, 0);
        if( tImage !== '' ) {
          this.displaySplitWindowImage(tImage)
        } else {
          const image = this.cacheSeriesService.getCachedSeriesByCat(category);
          image && this.displaySplitWindowImage(image.blob);
        }
        resolve('')
    })
  }
  private displaySplitWindowImage(image: any) {
    // console.log('-- displaySplitWindowImage -3 this.focusedSplitIdx, this.splitIdx, this.splitAction', this.focusedSplitIdx, this.splitIdx, this.splitAction)
    if( this.splitIdx !== this.focusedSplitIdx && !this.splitAction) {
      return
    }
    this.image.nativeElement.src = image;
    this.originalImage = this.image.nativeElement.src;
    this.cdr.detectChanges();
    /** To focus on the selected split window as the first window */
    this.store.dispatch(new SetSelectedSplitWindowId('element1'));

    /**
     * 1. In case, window is opened by split mode action,
     * 2. and user clicked arrow button,
     * 3. this time splitAction is true
     * 4. reset splitAction false when the last split window is displayed.
     * this can protect abnormal display
     * */
    if( this.splitAction === true ) {
      const splitIdx = this.splitService.elements.findIndex((val:any) => val === this.splitService.selectedElement)
      // console.log(' displaySplitWindowImage -4 splitIdx', splitIdx);
      if( this.splitMode -1  === splitIdx)
        this.store.dispatch(new SetSplitAction(false));
    }
    //
  }

  private getRemainedImageList(queryUrl: string) {
    this.imageService.getTotalImageList(queryUrl)
      .subscribe((val: any) => {
        const category = queryUrl.split('.')[0].split('/')[2];
        //
        const urls = this.imageService.getCacheUrls();
        /** Try to display if there are any cached image before check additional loading  */
        this.store.dispatch(new SetImageUrls([]));
        this.store.dispatch(new SetIsImageLoaded({idx:0}));
        //
        this.makeReadingRemainedImages(val, category, urls);
      }, error => {
        throw Error(error)
      });
  }


  private makeReadingRemainedImages(val: any, category: string, urls: { idx: number; category: string; url: string }[]) {
    this.checkIfAdditionalLoading(val, category, urls).then((res: any) => {
      // console.log(' cat5 - 3 getTotalImageList remained url', category, res, res.length)
      if (res.length > 0) { // If there is remained url that need loading image
        this.imageCount[this.categoryIdx] = res.length;
        /** Send urls to webworker for loading images additionally */
        this.webworkerPostMessage(res, category);
      } else {
        this.progress[this.categoryIdx] = '';
      }
    });
  }

  checkIfAdditionalLoading(val: any, category: string, urls: { idx: number; category: string; url: string }[]) {
    /** Check if image is cached already, then skip caching job
     * or extract remained urls, which is needed loading image by using webworker */
    return new Promise((resolve, reject) => {
      const input$ = of({req: val, category, urls: urls});

      if (!this.splitService.bWorker) {
        this.splitService.bWorker = new Worker(new URL('../../../../assets/workers/additional-loading.worker', import.meta.url), {type: 'module'})
      }
      fromWorker<{}, string[]>(
        () => this.splitService.bWorker,
        input$,
      ).subscribe(res => {
        resolve(res)
      }, error => reject(error))
    });
  }

  private webworkerPostMessage(val: any, category: string) {
    // console.log(' cat5 - 7 webworkerPostMessage-- val', val, val.length, category)
    const data: any = {
      msg: 'download',
      body: val,
      category: category
    }
    /** Send source data to webworker, which is the base data that needs background job */
    if(this.worker[this.splitIdx]) this.worker[this.splitIdx].postMessage(data)
    // this.worker[this.categoryIdx].postMessage(data)
  }

  ngAfterViewInit() {
  }
  nextImage() {
    if( this.splitIdx !== this.focusedSplitIdx && !this.splitAction) return

    const image = this.carouselService.getNextImage(this.currentCategory, this.splitService.selectedElement);
    this.displaySplitWindowImage(image);
  }
  prevImage() {
    if( this.splitIdx !== this.focusedSplitIdx && !this.splitAction) return

    const image = this.carouselService.getPrevImage(this.currentCategory, this.splitService.selectedElement);
    this.displaySplitWindowImage(image);
  }
  private webWorkerProcess(category: string) {
    if (typeof Worker !== 'undefined') {
      if( !this.worker[this.splitIdx]) {
        // console.log(' worker[this.splitIdx]', this.worker[this.splitIdx], this.splitIdx)
        this.worker[this.splitIdx] = new Worker(new URL('../../../../assets/workers/carousel.worker.ts', import.meta.url));
        this.worker[this.splitIdx].onmessage = (data: any) => {
          this.progress[this.categoryIdx] = ((data.data.imageId + 1)/ this.imageCount[this.categoryIdx] * 100).toFixed(0).toString();
          this.makeCachedImage(data.data);
          const _data: any = {
            msg: 'completeCachedImage',
            body: data.data.url,
            category: category
          }
          // console.log(' worker2', category, this.splitIdx)
          /** Send the signal of completing loading one image of all the images
           * that was sent to webworker as bundle urls
           * This means for being ready to receiving the next image*/
          this.worker[this.splitIdx].postMessage(JSON.parse(JSON.stringify(_data)))
        };
      }
    }
  }

  private makeCachedImage(data: ImageModel) {
    if(  !data.blob.type || !data.blob.size) {
      // data is not Blob type.
      return;
    }
    const image: any = this.imageService.readFile(data.blob)
    image.subscribe((obj: any) => {
      data.blob = obj;
      // console.log('---- data2 category', data.imageId, data.category)
      this.saveCacheImage(data);
    })
  }

  saveCacheImage(data: ImageModel) {
    this.imageService.checkAndCacheImage(data)
    /** Triggering that every image is loading, then thumbnail list is updated continuously */
    this.store.dispatch(new SetImageUrls([data.url]));
    /** To show the first image in the main window */
    this.store.dispatch(new SetIsImageLoaded({idx:data.imageId}));
  }
///////////////////////////////////////////////////
  private splitWindowProcess1() {
    /**
     * When it comes to rendering of split-windows,
     * each window need to wait until the previous window finished rendering.
     * -----------------
     * 1. The end of processing of image in one of the split windows,
     *    emit event of "isStartedRendering$" for each split window.
     * 2. As soon as take the event of "isStartedRendering$" the next split window start processing .
     * 3. This split window display the first image only and emit event of "isFinishedRendering$"
     *    ,which means the next split window that was waiting the "isFinishedRendering" of previous
     *    split window is about to start processing.
     * */
      //
    const isFinished$ = this.getCurrentSplitOperation$.pipe( // 1 To know the end of image processing
        switchMap((val:any) => {
          this.splitService.selectedElement = val.element; // 2
          return this.splitService.isFinishedRendering$[val.element].pipe(take(1));
        }),
        take(1), // 3
      );

    const isStarted$ = this.getCurrentSplitOperation$.pipe( // 4 To know the start of image processing
      switchMap((val: any) => {
        this.splitService.selectedElement = val.element;
        return this.splitService.isStartedRendering$[val.element].pipe(take(1));
      }),
      take(1),
    );

    if (this.splitMode > 1) {
      if (this.splitService.selectedElement === 'element1') { // 5 first split window
        this.tempObservable = defer(() => of(EMPTY).pipe());
      } else if (this.splitService.selectedElement === 'element2') {
        this.tempObservable = zip(isStarted$, isFinished$).pipe( //['element2','element1']
          filter((val: any) => val[1] === 'element1') // 6
        );
      } else if (this.splitService.selectedElement === 'element3') {
        this.tempObservable = zip(isStarted$, isFinished$).pipe( //['element3','element2']
          filter((val: any) => val[1] === 'element2'),
        );
      } else if (this.splitService.selectedElement === 'element4') {
        this.tempObservable = zip(isStarted$, isFinished$).pipe( //['element4','element3']
          filter((val: any) => val[1] === 'element3'),
        );
      }
    } else {
      this.tempObservable = defer(() => of(EMPTY).pipe()); // 7
    }
  }
  //
  private splitWindowProcess2() {
    const rendering$: Observable<any> = this.requestRenderingSplitWindow$[this.splitService.selectedElement];
    // 8
    zip(this.tempObservable, rendering$).pipe( // 9
      // tap( val => console.log(' tempObsevable, rendering$ -2', this.tempObservable, rendering$, this.categoryIdx)),
      take(1),
    ).subscribe(([temp, element]) => {
      /** Start processing next window after finished processing for previous split window*/
      const idx = this.splitService.elements.findIndex(val => val === element)
      this.splitService.selectedElement = element;
      /** When change split mode, need to set the first signal to prepare processing
       * because each split window do process one by one */
      this.store.dispatch(new SetCurrentSplitOperation({element: this.splitService.selectedElement}));
      // console.log('categoryIdx splitWindowProcess2',  this.categoryIdx);
      this.makingSplitWindowBySelectedSeries(this.categoryIdx); // 10
    });
  }
///////////////////////////////////////////////////////

  ngOnDestroy() {
    this.unsubscribe.next({});
    this.unsubscribe.complete();
  }
}
