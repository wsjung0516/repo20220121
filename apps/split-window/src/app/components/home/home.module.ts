import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {GridModule} from "../grid/grid.module";
import {ThumbnailModule} from "../thumbnail/thumbnail.module";
import {SeriesModule} from "../series/series.module";
import {NgxsSelectSnapshotModule} from "@ngxs-labs/select-snapshot";

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    GridModule,
    ThumbnailModule,
    SeriesModule,
  ],
  exports: [
    HomeComponent,
    GridModule
  ]
})
export class HomeModule { }
