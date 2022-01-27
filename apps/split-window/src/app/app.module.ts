import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { HttpClientModule } from '@angular/common/http';
import {CarouselModule} from "./components/carousel.module";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DisplayImageComponent } from './components/display-image/display-image.component';
import {GridModule} from "./components/grid/grid.module";
import {NgxsModule} from "@ngxs/store";
import {StatusState} from "../state/status/status.state";
import {NgxsSelectSnapshotModule} from "@ngxs-labs/select-snapshot";

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [BrowserModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    GridModule,
    NgxsModule.forRoot([StatusState]),
    NgxsSelectSnapshotModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
