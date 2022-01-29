import { Component, OnInit } from '@angular/core';
// @ts-ignore
import {ImageModel, SeriesModel} from "@repo20220121/data";
import {ISelectedGridTemplate, StatusState} from "../../../state/status/status.state";
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";

@Component({
  selector: 'home',
  template: `
    <grid-toolbar></grid-toolbar>
    <div class="w-screen">
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
<!--              <app-grid></app-grid>-->
            </div>
          </div>
        </div>
      </div>
    </div>

  `,
  styles: []
})
export class HomeComponent implements OnInit {
  currentImages: ImageModel[] | undefined;
  selectedImage: ImageModel;
  currentSeries: SeriesModel[] |  undefined;
  selectedSeries: SeriesModel;
  @Select(StatusState.getSelectedGridTemplate) selectedGridTemplate$: Observable<ISelectedGridTemplate> | undefined;
  constructor() { }

  ngOnInit(): void {
    // @ts-ignore
    this.selectedGridTemplate$.pipe()
      .subscribe( val => console.log( 'val'))
  }
  onSelectSeries(ev: any) {

  }
}
