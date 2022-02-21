import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {NgxsModule, Store} from "@ngxs/store";
import {NgxsSelectSnapshotModule} from "@ngxs-labs/select-snapshot";
import {HomeModule} from "./components/home/home.module";
import {CarouselModule} from "./components/carousel/carousel.module";
import { SpinnerComponent } from './utils/spinner/spinner.component';
import {AngularMaterialsModule} from "../../shared/angular-materials.module";
import {SpinnerInterceptorService} from "./utils/spinner/spinner-interceptor.service";

@NgModule({
  declarations: [AppComponent, SpinnerComponent],
  imports: [BrowserModule,
    HttpClientModule,
    CarouselModule,
    BrowserAnimationsModule,
    AngularMaterialsModule,
    HomeModule,
    NgxsModule.forRoot([]),
    NgxsSelectSnapshotModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent],
  exports: [
    SpinnerComponent
  ]
})
export class AppModule {}
