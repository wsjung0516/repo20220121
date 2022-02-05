import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
// @ts-ignore
import {ImageModel, SeriesModel} from "@repo20220121/data";
import {ISelectedGridTemplate, StatusState} from "../../../state/status/status.state";
import {Select, Store} from "@ngxs/store";
import {Observable, of, Subject, takeUntil} from "rxjs";
import {CacheSeriesService} from "../../services/cashe-series.service";
import {fromWorker} from "observable-webworker";
import {ImageService} from "../../services/image.service";
import {SeriesItemService} from "../series/series-item.service";
import {
  SetCurrentCategory,
  SetFocusedSplit, SetIsImageLoaded,
  SetIsSeriesLoaded, SetSelectedImageById, SetSelectedSeriesById,
  SetSeriesUrls, SetSplitAction
} from "../../../state/status/status.actions";
import {skip, tap} from "rxjs/operators";
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";
import {SplitService} from "../../services/split.service";

@Component({
  selector: 'home',
  template: `
    <grid-toolbar (selectMode)="onSelectMode($event)"></grid-toolbar>
    <div class="w-auto">
      <div class="h-24">
        <div class="bg-blue-200">
          <div class="">
            <thumbnail-list [currentImages]="currentImages"
                            [selectedImage]="selectedImage"
            >
            </thumbnail-list>
          </div>
        </div>
      </div>
      <div class="h-auto ">
        <div class="mt-1">
          <!--      <app-carousel-main [queryUrl]="queryUrl"></app-carousel-main>-->
          <div class="grid grid-cols-10 gap-2">
            <div class="h-auto col-span-1 bg-blue-100">
              <h2 class="mx-3 mt-2">Category</h2>
              <series-list [currentSeries]="currentSeries"
                            [selectedSeries]="selectedSeries"
                            (selectSeries)="onSelectSeries($event)">
              </series-list>
            </div>
            <div class="h-auto col-span-9 bg-red-100">
              <display-grid [splitMode]="splitMode" ></display-grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class HomeComponent implements OnInit, OnDestroy {
  currentImages: ImageModel[] | undefined;
  selectedImage: ImageModel;
  currentSeries: {seriesList: SeriesModel[]};
  // currentSeries: SeriesModel[] |  undefined;
  selectedSeries: SeriesModel;
  splitMode: number | undefined;
  unsubscribe = new Subject();
  unsubscribe$ = this.unsubscribe.asObservable();
  seriesWorker: Worker | undefined;
  category: string | undefined;

  @Select(StatusState.getImageUrls)  getImageUrls$: Observable<string[]>;
  @Select(StatusState.getSelectedGridTemplate) selectedGridTemplate$: Observable<ISelectedGridTemplate> | undefined;
  @Select(StatusState.getSeriesUrls) seriesUrls$: Observable<string[]>;
  @Select(StatusState.getCurrentCategory) currentCategory$: Observable<string>;
  @Select(StatusState.getSelectedImageById)  getSelectedImageById$: Observable<ImageModel>;
  @SelectSnapshot(StatusState.getCategoryList)  category_list: string[];

  constructor(
    private cacheSeriesService: CacheSeriesService,
    private imageService: ImageService,
    private seriesItemService: SeriesItemService,
    private store: Store,
    private splitService: SplitService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    /** Display series list  */
    this.thumbnailWorkerProcess();
    this.seriesWorkerProcess();
    // @ts-ignore
    this.selectedGridTemplate$.pipe(takeUntil(this.unsubscribe$))
      .subscribe( val => console.log( 'val', val))
    // this.currentSeries = {seriesList:[]}
    this.initializeSeriesList();
  }
  /** Initializing selected series for the first time */
  initializeSeriesList() {
    const initial_value = {
      seriesId: 1,
      url: '',
      blob: '',
      category: 'animal'
    }
    setTimeout(() => {
      this.selectedSeries = initial_value;
      this.store.dispatch(new SetCurrentCategory('animal'));
    },1000);
  }

  onSelectSeries(ev: SeriesModel) {
    // console.log('onSelectSeries -2', this.currentSeries );
    this.store.dispatch(new SetSplitAction(false));
    this.splitService.currentImageIndex[this.splitService.selectedElement] = 0;
    // Setting the current selected category
    this.store.dispatch(new SetCurrentCategory(ev.category));
    // Select series and get the image list.
    this.store.dispatch(new SetSelectedSeriesById(ev.seriesId));
    // Focusing the first thumbnail_item
    const image: ImageModel = {
      imageId: 0,
      category: ev.category,
      url: '',
      blob: '',
      title: ''
    }
    this.store.dispatch(new SetSelectedImageById(image));
    // Enable display the first image in the main window
    this.store.dispatch(new SetIsImageLoaded({idx: 0}));
  }

  onSelectMode( ev: any) {
    console.log(' splitMode', ev);
    this.splitMode = ev.mode;
    this.store.dispatch(new SetFocusedSplit(ev.mode));
    this.store.dispatch(new SetSplitAction(false));
    //
    // this.carouselService.getNextImage(this.currentCategory, this.splitService.selectedElement);
    this.splitService.selectedElement = ev;
  }
  thumbnailWorkerProcess() {
    // this.getImageUrls$.pipe(
    this.currentCategory$.pipe().subscribe(val => {
      this.category = val;
      // console.log('-- category -1', val)
    });
    this.currentImages = [];
    this.getImageUrls$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(() => {
      this.currentImages = this.imageService.cachedThumbnailImages.map(val => val.image)
        .filter(val => {
          // console.log(' -----val', val);
          return val.category === this.category
        });

         console.log('this.currentImages -2', this.category, this.currentImages)
    });
    /**
     * Triggered from series-list.component ( onSelectSeries),
     *      carousel.service (getPrevImage, getNextImage)
     */
/*
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
*/

  }
  seriesWorkerProcess() {
    this.seriesUrls$.pipe(
      skip(1),
      takeUntil(this.unsubscribe$),
      tap((url) => {
        this.currentSeries = {seriesList:[]} ;
        // this.cacheSeriesService.cachedSeries.map( v => this.currentSeries.seriesList.push(v));
        this.currentSeries.seriesList = [...this.cacheSeriesService.cachedSeries]
        // console.log(' this.currentSeries', this.currentSeries)
      })
    ).subscribe()

    /**
     *
     * */
    if( typeof Worker !== 'undefined') {
      this.seriesWorkerSubProcess();
    }
  }
  private seriesWorkerSubProcess() {
    /** Start series web worker with the initial values */
    this.seriesItemService.getSeriesObject()
      .subscribe((val: any[]) => {
        const input$ = of(val);

        if (!this.seriesWorker) {
          this.seriesWorker = new Worker(new URL('../../../assets/workers/series.worker', import.meta.url), {type: 'module'})
        }
        // @ts-ignore
        fromWorker<{}, {}>(          () => this.seriesWorker, input$)
          .subscribe((data: any) => {
           // console.log('--- series list - webWorkerProcess - data', data);
            /** read blob data */
            const series: any = this.imageService.readFile(data.blob)
            series.subscribe((obj: any) => {
              data.blob = obj;
              this.cacheSeriesService.checkAndCacheSeries(data);
              this.store.dispatch(new SetIsSeriesLoaded(true));
              this.store.dispatch(new SetSeriesUrls([data.url]))
            })
          }, (error: any) => console.error(error))
      });
  }

  ngOnDestroy() {
    this.unsubscribe.next({});
    this.unsubscribe.complete();
    localStorage.clear();
  }
}
