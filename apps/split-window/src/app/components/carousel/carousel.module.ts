import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CarouselService} from "../../services/carousel.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {CarouselMainComponent} from "./carousel-main/carousel-main.component";
import {AngularMaterialsModule} from "../../../../shared/angular-materials.module";
import {NgxsModule} from "@ngxs/store";
import {NgxsSelectSnapshotModule} from "@ngxs-labs/select-snapshot";
import {StatusState} from "../../../state/status/status.state";
import { CarouselMainDisplayComponent } from './carousel-main/carousel-main-display/carousel-main-display.component';

@NgModule({
  declarations: [CarouselMainComponent, CarouselMainDisplayComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    AngularMaterialsModule,
    NgxsModule.forRoot([]),
    NgxsModule.forFeature([StatusState]),
    NgxsSelectSnapshotModule.forRoot(),
  ],
  exports: [
    CarouselMainComponent,
    CarouselMainDisplayComponent
  ],
  providers: [CarouselService, HttpClient]
})
export class CarouselModule { }
