import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter,
  Input, OnChanges,
  OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {
  CdkVirtualScrollViewport,
} from "@angular/cdk/scrolling";
// @ts-ignore
import {SeriesModel} from "@repo20220121/data";
import {CacheSeriesService} from "../../../services/cashe-series.service";
import {SetCategoryList} from "../../../../state/status/status.actions";
import {Store} from "@ngxs/store";

@Component({
  selector: 'series-list',
  template: `
    <div class="h-40">
      <div class="cdk-scroll-source w-auto">
        <cdk-virtual-scroll-viewport itemSize="90"
                                     class="cdk-scroll-viewport"
                                     orientation="vertical"
        >
          <ng-container *cdkVirtualFor="let item of _currentSeries">
            <series-item [seriesImage]="item"
                             [addClass]="addClass"
                             (selected)=onSelectSeries($event)>
            </series-item>
          </ng-container>
        </cdk-virtual-scroll-viewport>
      </div>
    </div>
  `,
  styles: [`
    .cdk-scroll-source {
      writing-mode: horizontal-tb;
      /*writing-mode: vertical-lr;*/
    }

    .cdk-scroll-source .cdk-scroll-viewport {
      height: 650px;
      width: 100%;
    }

    .cdk-scroll-source .cdk-scroll-viewport .cdk-virtual-scroll-content-wrapper {
      display: flex;
      flex-direction: column;
    }
  `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeriesListComponent implements OnInit, AfterViewInit {
  _currentSeries : any[];
  @Input() set selectedSeries (v: SeriesModel){
    // this.onSelectSeries(v);
  };
  @Input() set currentSeries (se:  any) {
  }
  @Output() selectSeries = new EventEmitter<any>()
  @ViewChild(CdkVirtualScrollViewport, {static: true}) viewPort: CdkVirtualScrollViewport | undefined;

  addClass: {} = {};
  constructor(
    private cdr: ChangeDetectorRef,
    private cacheSeriesService: CacheSeriesService,
    private store: Store
) { }
  ngOnInit(): void {
    const initial_value = {
      seriesId: 1,
      url: '',
      blob: '',
      category: 'animal'
    }
    localStorage.setItem('selectedSeriesId', JSON.stringify(initial_value));
  }
  ngAfterViewInit() {
    console.log('seriesList ngAfterViewInit')
    this.addClassFn();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['currentSeries'] && changes['currentSeries'].currentValue) {
      const seriesList = changes['currentSeries'].currentValue.seriesList;
      this._currentSeries = [];
      seriesList.map((v: SeriesModel) => this._currentSeries.push({series:v}))
      // console.log('seires-list changes', changes['currentSeries'].currentValue, this._currentSeries)
       this.addClassFn();
    }
  }
  /**
   *  Update series item whenever change series list
   * */
  private addClassFn(ev?: SeriesModel) {
    // console.log(' addClassFn',ev?.seriesId)
    setTimeout(() => {
      this.addClass = {
        class: 'selected_item',
        index: ev?.seriesId
      }
      this.viewPort?.scrollToIndex(0, 'smooth')
      // this.viewPort?.scrollToIndex(ev?.seriesId, 'smooth')
    }, 200);

    this.cdr.detectChanges();
  }

  tmpSeries: any[];
  onSelectSeries(ev: SeriesModel) {
    if( !ev) return;
    // console.log( '--- onSelectSeries-list id', ev.seriesId )
    this.selectSeries.emit(ev);
    //
    this.setSelectedSeriesToTopPosition(ev);

    /**
     * To synchronize with the current selected Series, after when it is activated by clicking Series-list
     * */
    localStorage.setItem('selectedSeriesId', JSON.stringify(ev));
    this.addClassFn(ev);
  }
  /**
   * Assign selected series at the first position
   * */
  private setSelectedSeriesToTopPosition(ev: SeriesModel) {
    this.tmpSeries = []
    this.tmpSeries = [...this._currentSeries]
    const index = this.tmpSeries.findIndex( val => val.series.category === ev.category)
    let series = this.tmpSeries.splice(index, 1);
    this.tmpSeries.unshift(series[0])
    this._currentSeries = [...this.tmpSeries];
    const categories = this.tmpSeries.map( v => v.series.category);
    this.store.dispatch( new SetCategoryList(categories))
  }
}
