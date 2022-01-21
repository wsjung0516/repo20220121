import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselMainComponent } from './carousel-main/carousel-main.component';
import {AngularMaterials} from "../../../shared/angular-materials";
import {HttpClientModule} from "@angular/common/http";
import {DisplayImageComponent} from "./display-image/display-image.component";



@NgModule({
  declarations: [
    CarouselMainComponent,
    DisplayImageComponent
  ],
  exports: [
    CarouselMainComponent,
    DisplayImageComponent
  ],
  imports: [
    CommonModule,
    AngularMaterials,
  ]
})
export class CarouselModule { }
