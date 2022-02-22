import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, EventEmitter,
  Input,
  OnInit, Output,
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
export class SeriesListComponent implements OnInit {
  _currentSeries : any[];
  @Input() set selectedSeries (v: any){
    // console.log('data2', v);
    v && this.addClassFn(v);
  };
  @Input() set currentSeries (se:  any) {
    if( se ) {
      this._currentSeries = se.series;
    }
  }
  @Output() selectSeries = new EventEmitter<any>()
  @ViewChild(CdkVirtualScrollViewport, {static: true}) viewPort: CdkVirtualScrollViewport | undefined;

  addClass: {} = {};
  constructor(
    private cdr: ChangeDetectorRef,
    private cacheSeriesService: CacheSeriesService,
    private store: Store
  ) {}
  ngOnInit(): void {
    const initial_value = {
      series: {
        seriesId: 0,
        url: '',
        blob: '',
        category: 'animal'
      }
    }
    localStorage.setItem('selectedSeriesId', JSON.stringify(initial_value));
  }
  ngAfterViewInit() {
  }

  tmpSeries: any[];
  onSelectSeries(ev: SeriesModel) {
    if( !ev) return;
    /**
     * To synchronize with the current selected Series, after when it is activated by clicking Series-list
     * */
    this.selectSeries.emit(ev);
    localStorage.setItem('selectedSeriesId', JSON.stringify({series:ev}));
    this.addClassFn(ev);
  }

  private addClassFn(ev: SeriesModel) {
    setTimeout(() => {
      this.addClass = {
        class: 'selected_item',
        category: ev.category
      }
      this.cdr.detectChanges();
      this.viewPort.scrollToIndex(ev.seriesId, 'smooth')
    }, 200);
  }
}
