import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {GridModule} from "../grid/grid.module";
import {ThumbnailModule} from "../thumbnail/thumbnail.module";
import {SeriesModule} from "../series/series.module";
import {AppModule} from "../../app.module";

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
