import {NgModule} from "@angular/core";
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from "@angular/material/button";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {CommonModule} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
const materials = [
  MatRadioModule,
  MatButtonModule,
  MatProgressBarModule,
  MatGridListModule,
  MatToolbarModule,
  MatMenuModule,
  ScrollingModule,
  MatIconModule,
  MatTooltipModule,
  MatProgressSpinnerModule
]

@NgModule({
  declarations:[],
  imports:[
    CommonModule,
    ...materials
  ],
  exports:[
    ...materials,
  ]
})
export class AngularMaterialsModule {}
