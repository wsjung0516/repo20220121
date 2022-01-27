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
import { ToolbarComponent } from './toolbar.component';
/*
import {GridTemplateComponent} from "./grid-template/grid-template.component";
import {AngularMaterials} from "../../../../shared/angular-materials";
import {GridTemplateDirective} from "./grid-directives/grid-template.directive";
import {SelectColorDirective} from "./grid-directives/select-color.directive";
*/

@NgModule({
  declarations: [
    GridTemplateDirective,
    GridTemplateComponent,
    // GridComponent,
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

  ],
  exports: [
    GridTemplateDirective,
    GridTemplateComponent,
    // GridComponent,
    SelectColorDirective,
    DisplayGridComponent,
    DisplayGridTemplateComponent,
    GridMenuComponent,
    ToolbarComponent
  ]
})
export class GridModule { }
