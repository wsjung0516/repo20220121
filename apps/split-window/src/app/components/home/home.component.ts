import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
// @ts-ignore
import {ImageModel, SeriesModel} from "@repo20220121/data";
import {ISelectedGridTemplate, StatusState} from "../../../state/status/status.state";
import {Select, Store} from "@ngxs/store";
import {Observable, of, startWith, Subject, takeUntil} from "rxjs";
import {CacheSeriesService} from "../../services/cashe-series.service";
import {fromWorker} from "observable-webworker";
import {ImageService} from "../../services/image.service";
import {SeriesItemService} from "../series/series-item.service";
import {
  SetCurrentCategory,
  SetFocusedSplit, SetImageUrls,
  SetIsImageLoaded,
  SetIsSeriesLoaded,
  SetSelectedImageById, SetSelectedImageByUrl,
  SetSelectedSeriesById,
  SetSeriesUrls,
  SetSplitAction, SetSplitCategory
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
                            (selectItem)="onSelectItem($event)"  >
            </thumbnail-list>
          </div>
        </div>
      </div>
      <div class="h-auto ">
        <div class="mt-1">
          <div class="grid grid-cols-10 gap-2">
            <div class="h-auto col-span-1 bg-blue-100">
              <div class="mx-3 mt-2 mb-2 text-xl font-bold font-weight: 900">Category</div>
              <series-list [currentSeries]="currentSeries"
                            [selectedSeries]="selectedSeries"
                            (selectSeries)="onSelectSeries($event)">
              </series-list>
            </div>
            <div class="h-auto col-span-9 bg-red-100">
              <display-grid [splitMode]="splitMode"
                            (selectTpl)="onSelectTemplate($event)" >
              </display-grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {
  currentImages: any[];
  selectedImage: any;
  currentSeries: {series: SeriesModel[]};
  selectedSeries: any;
  splitMode: number | undefined;
  unsubscribe = new Subject();
  unsubscribe$ = this.unsubscribe.asObservable();
  seriesWorker: Worker | undefined;
  category: string | undefined;

  @Select(StatusState.getImageUrls)  getImageUrls$: Observable<string[]>;
  @Select(StatusState.getSelectedGridTemplate) selectedGridTemplate$: Observable<ISelectedGridTemplate> | undefined;
  @Select(StatusState.getSeriesUrls) seriesUrls$: Observable<string[]>;
  @Select(StatusState.getCurrentCategory) currentCategory$: Observable<string>;
  //
  @SelectSnapshot(StatusState.getCategoryList)  category_list: string[];
  @SelectSnapshot(StatusState.getSplitCategories)  split_category_list: string[];
  @SelectSnapshot(StatusState.getFocusedSplit)  focusedSplit: number;

  constructor(
    private cacheSeriesService: CacheSeriesService,
    private imageService: ImageService,
    private seriesItemService: SeriesItemService,
    private store: Store,
    private splitService: SplitService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    /** Display thumbnail list  */
    this.thumbnailWorkerProcess();
    /** Display series list  */
    this.seriesWorkerProcess();
    //
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
      /** Default category */
      this.store.dispatch(new SetCurrentCategory('animal'));
    },1000);
  }
  /** Select template by clicking one of the split windows */
  onSelectTemplate( ev: any ) {
    // {element: 'element4', idx: 3}
    this.store.dispatch(new SetFocusedSplit(ev.idx));
    this.store.dispatch(new SetSplitAction(false));

    const category = this.split_category_list[ev.idx]
    // console.log( ' Home component -- onSelectTemplate',ev, this.splitService.currentImageIndex[category])
    this.store.dispatch(new SetCurrentCategory(category));
    // this.store.dispatch(new SetSplitCategory({idx: ev.idx, category:category}));
    // Trigger displaying thumbnail image
    this.store.dispatch(new SetImageUrls([]));
    //
    this.selectedSeries = {
      seriesId: 0,
      url: '',
      blob: '',
      category: category
    }
    localStorage.setItem('selectedSeriesId',JSON.stringify({series:this.selectedSeries}));
    // Mark bolder line for the  selected thumbnail item
    const selectedImageIdx = this.splitService.currentImageIndex[category];
    this.selectedImage = {item:{imageId: selectedImageIdx, url:'', blob:'', title:'', category: this.category}}
    this.cdr.detectChanges();
    // Select series and get the image list.
    const seriesId = this.category_list.findIndex( val => val === category);
    /** Select series and update thumbnail item */
    this.store.dispatch(new SetSelectedSeriesById(seriesId));

  }
  /** Select series item by clicking category list */
  onSelectSeries(ev: SeriesModel) {
    this.store.dispatch(new SetSplitAction(false));
    this.splitService.currentImageIndex[ev.category] = 0;
    // this.splitService.currentImageIndex[this.splitService.selectedElement] = 0;
    // Setting the current selected category
    this.store.dispatch(new SetSplitCategory({idx: this.focusedSplit, category: ev.category}));
    // this.store.dispatch(new SetSplitCategory({idx: 0, category: ev.category}));
    // console.log('data2 onSelectSeries -2', ev.category, this.split_category_list, this.focusedSplit );
    this.store.dispatch(new SetCurrentCategory( ev.category));
    // Select series and get the image list.
    /** Select series and update thumbnail item */
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
    // Make signal the first image is loaded,
    // which can be the starting point of processing for the next split window
    this.store.dispatch(new SetIsImageLoaded({idx: this.focusedSplit}));
    // Trigger displaying thumbnail image
    this.store.dispatch(new SetImageUrls([]))
  }
  /** Select thumbnail item by clicking  */
  onSelectItem( ev: any) {
    // console.log('select item',ev);
    this.store.dispatch(new SetSplitAction(false));
    this.store.dispatch(new SetSelectedImageById(ev));
    this.cdr.detectChanges();
    // If splitAction is true, it's time to change split mode so need to stop changing
    // image selection.
    this.splitService.currentImageIndex[ev.category] = ev.imageId;
    // console.log('data1', this.splitService.currentImageIndex)
  }
  /** Select split mode by clicking grid menu in the toolbar */
  onSelectMode( ev: any) {
    // console.log(' splitMode', ev);
    /**
     *  Selecting splitMode trigger display-grid.component. --> display-grid-template.component -->
     *  grid-template.directive --> grid-template.component --> carousel-main.component
     */
    this.splitMode = ev.mode;
    // If splitAction is true, it's time to change split mode so need to stop changing
    // image selection.
    this.store.dispatch(new SetSplitAction(true));
    this.splitService.selectedElement = ev;
  }
  /** Display thumbnail item, whenever event triggering */
  thumbnailWorkerProcess() {
    // this.getImageUrls$.pipe(
    this.currentCategory$.pipe().subscribe(val => {
      this.category = val;
      //console.log('-- cat5-4', val)
    });
    /**
     * Whenever imageUrl is updated from carousel-main.component, thumbnail list is updated.
     * */
    this.getImageUrls$.pipe(
      takeUntil(this.unsubscribe$),
    ).subscribe(() => {
      this.currentImages = [];
      this.currentImages = this.imageService.cachedThumbnailImages.map(val => val.image)
        .filter(val =>  {
          return val.category === this.category
        })
        .map( (v: any) => {
          return {item: v}
        });
        this.cdr.detectChanges();
    });
  }
  /** Display series image upon receiving series images that are updated by the webworker process */
  seriesWorkerProcess() {
    this.seriesUrls$.pipe(
      skip(1),
      takeUntil(this.unsubscribe$),
      tap((url) => {
        this.currentSeries = {series:[]} ;
        // this.cacheSeriesService.cachedSeries.map( v => this.currentSeries.seriesList.push(v));
        this.currentSeries.series = [...this.cacheSeriesService.cachedSeries]
        // this.cdr.detectChanges();
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
  /**
   * Use webworker to not wait until series images are loaded
   * */
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
            /** read blob data */
            const series: any = this.imageService.readFile(data.blob)
            series.subscribe((obj: any) => {
              // console.log('--- series list - webWorkerProcess - data', data.seriesId);
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
