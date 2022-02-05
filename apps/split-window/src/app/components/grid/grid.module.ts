import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DisplayGridComponent} from "./display-grid/display-grid.component";
import {AngularMaterialsModule} from "../../../../shared/angular-materials.module";
import {DisplayGridTemplateComponent} from "./display-grid/display-grid-template.component";
import {GridTemplateComponent} from "./grid-template/grid-template.component";
import {GridTemplateDirective} from "./grid-directives/grid-template.directive";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {SelectColorDirective} from "./grid-directives/select-color.directive";
import { GridMenuComponent } from './grid-menu/grid-menu.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {NgxsModule, StateStream, Store} from "@ngxs/store";
import {StatusState} from "../../../state/status/status.state";
import {NgxsSelectSnapshotModule} from "@ngxs-labs/select-snapshot";
import {CarouselModule} from "../carousel/carousel.module";

@NgModule({
  declarations: [
    GridTemplateDirective,
    GridTemplateComponent,
    SelectColorDirective,
    DisplayGridComponent,
    DisplayGridTemplateComponent,
    GridMenuComponent,
    ToolbarComponent
  ],
    imports: [
        CommonModule,
        BrowserAnimationsModule,
        BrowserModule,
        AngularMaterialsModule,
        NgxsModule.forRoot(),
        NgxsModule.forFeature([StatusState]),
        CarouselModule,
    ],
  exports: [
    GridTemplateDirective,
    GridTemplateComponent,
    SelectColorDirective,
    DisplayGridComponent,
    DisplayGridTemplateComponent,
    GridMenuComponent,
    ToolbarComponent
  ],
})
export class GridModule { }
