import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxsModule, Store} from "@ngxs/store";
import {NgxsSelectSnapshotModule} from "@ngxs-labs/select-snapshot";
import {HomeModule} from "./components/home/home.module";
import {CarouselModule} from "./components/carousel/carousel.module";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    HomeModule,
    NgxsModule.forRoot([]),
    NgxsSelectSnapshotModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
