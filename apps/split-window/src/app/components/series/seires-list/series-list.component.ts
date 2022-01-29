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

@Component({
  selector: 'series-list',
  template: `
    <div class="">
      <div class="cdk-scroll-source" style="width: 98%">
        <cdk-virtual-scroll-viewport itemSize="90"
                                     class="cdk-scroll-viewport"
                                     orientation="vertical"
        >
          <ng-container *cdkVirtualFor="let item of currentSeries">
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

  @Input() set selectedSeries (v: SeriesModel){
    this.onSelectSeries(v);
  };
  @Input() currentSeries: SeriesModel[] | undefined;
  @Output() selectSeries = new EventEmitter<any>()
  @ViewChild(CdkVirtualScrollViewport, {static: true}) viewPort: CdkVirtualScrollViewport | undefined;

  addClass: {} = {};
  constructor() { }

  ngOnInit(): void {
    // setTimeout(() => this.viewPort.scrollToIndex(val, 'smooth'), 200);
  }

  onSelectSeries(ev: SeriesModel) {
    // console.log( '--- thumbnail-list id', ev.imageId )
    localStorage.setItem('selectedSeriesId', JSON.stringify(ev));
    this.selectSeries.emit(ev);
    /**
     * To synchronize with the current selected Series, after when it is activated by clicking Series-list
     * */
    setTimeout(() => {
      this.viewPort?.scrollToIndex(ev.seriesId, 'smooth')
      this.addClass = {
        class: 'selected_item',
        index: ev.seriesId
      }
    }, 200);
  }
}
