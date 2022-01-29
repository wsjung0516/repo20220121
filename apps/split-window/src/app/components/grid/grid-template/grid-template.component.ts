import {Component, OnDestroy, OnInit, QueryList, TemplateRef, ViewChildren} from '@angular/core';
import {GridTemplateDirective} from "../grid-directives/grid-template.directive";
import {StateStream, Store} from "@ngxs/store";
import {SelectedGridTemplate} from "../../../../state/status/status.actions";

@Component({
  selector: 'app-grid-template',
  template: `
    <ng-template [appGridTemplate]="'element1'" let-height=height> <!-- to get proper template -->
      <div [style.height]="height">
        <div>
          <button [disabled]="selectedSplit[0]" mat-mini-fab class="fab-bottom-left"
                  matTooltip="Can use arrow keys"
                  [matTooltipPosition]="'above'"
                  (click)="onLeftArrowButton('element1')">
            <mat-icon>keyboard_arrow_left</mat-icon>
          </button>
          <button [disabled]="selectedSplit[0]" mat-mini-fab class="fab-bottom-right"
                  matTooltip="Can use arrow keys"
                  [matTooltipPosition]="'above'"
                  (click)="onRightArrowButton('element1')">
            <mat-icon>keyboard_arrow_right</mat-icon>
          </button>
        </div>
<!--
        <app-carousel-main [queryElement]="'element1'">  &lt;!&ndash; to make observable of making split window &ndash;&gt;
        </app-carousel-main>
-->
      </div>
    </ng-template>
    <ng-template [appGridTemplate]="'element2'" let-height=height>
      <div [style.height]="height">
        <div>
          <button [disabled]="selectedSplit[1]" mat-mini-fab class="fab-bottom-left"
                  matTooltip="Can use arrow keys"
                  [matTooltipPosition]="'above'"
                  (click)="onLeftArrowButton('element2')">
            <mat-icon>keyboard_arrow_left</mat-icon>
          </button>
          <button [disabled]="selectedSplit[1]" mat-mini-fab class="fab-bottom-right"
                  matTooltip="Can use arrow keys"
                  [matTooltipPosition]="'above'"
                  (click)="onRightArrowButton('element2')">
            <mat-icon>keyboard_arrow_right</mat-icon>
          </button>
        </div>
<!--
        <app-carousel-main [queryElement]="'element2'">
        </app-carousel-main>
-->
      </div>
    </ng-template>
    <ng-template [appGridTemplate]="'element3'" let-height=height>
      <div [style.height]="height">
        <div>
          <button [disabled]="selectedSplit[2]" mat-mini-fab class="fab-bottom-left"
                  matTooltip="Can use arrow keys"
                  [matTooltipPosition]="'above'"
                  (click)="onLeftArrowButton('element3')">
            <mat-icon>keyboard_arrow_left</mat-icon>
          </button>
          <button [disabled]="selectedSplit[2]" mat-mini-fab class="fab-bottom-right"
                  matTooltip="Can use arrow keys"
                  [matTooltipPosition]="'above'"
                  (click)="onRightArrowButton('element3')">
            <mat-icon>keyboard_arrow_right</mat-icon>
          </button>
        </div>
<!--
        <app-carousel-main [queryElement]="'element3'">
        </app-carousel-main>
-->
      </div>
    </ng-template>
    <ng-template [appGridTemplate]="'element4'" let-height=height>
      <div [style.height]="height">
        <div>
          <button [disabled]="selectedSplit[3]" mat-mini-fab class="fab-bottom-left"
                  matTooltip="Can use arrow keys"
                  [matTooltipPosition]="'above'"
                  (click)="onLeftArrowButton('element4')">
            <mat-icon>keyboard_arrow_left</mat-icon>
          </button>
          <button [disabled]="selectedSplit[3]" mat-mini-fab class="fab-bottom-right"
                  matTooltip="Can use arrow keys"
                  [matTooltipPosition]="'above'"
                  (click)="onRightArrowButton('element4')">
            <mat-icon>keyboard_arrow_right</mat-icon>
          </button>
        </div>
<!--
        <app-carousel-main [queryElement]="'element4'">
        </app-carousel-main>
-->
      </div>
    </ng-template>
  `,
  styles: [`
    .fab-bottom-left {
      position: absolute;
      left: 16px;
      top: 45%;
      bottom: 55%;
      z-index: 100;
    }
    .fab-bottom-right {
      position: absolute;
      right: 16px;
      top: 45%;
      bottom: 55%;
      z-index: 100;
    }
  `],
   // providers: [Store]
})
export class GridTemplateComponent{

  @ViewChildren(GridTemplateDirective) templateRef: QueryList<GridTemplateDirective> | undefined;
  selectedSplit: any[] = [];
  constructor(
    // private carouselService: CarouselService,
    private store: Store,
    // private splitService: SplitService
  ) {}

  getTemplate( name: string): TemplateRef<any> {
    // @ts-ignore
    return  this.templateRef && this.templateRef.toArray().find( x => x.name === name)!.template;
  }
  onLeftArrowButton(element: string) {
/*
    this.store.dispatch(new SetSplitAction(false));
    const idx = this.splitService.elements.findIndex(val => val === element);
    this.carouselService.getPrevImage(this.currentCategory, element);
    this.store.dispatch(new SetFocusedSplit(idx));
*/
    this.store.dispatch(new SelectedGridTemplate({templateName: element, button: 'left'}));
  }
  onRightArrowButton(element: string) {
/*
    this.store.dispatch(new SetSplitAction(false));
    this.carouselService.getNextImage(this.currentCategory, element);
    const idx = this.splitService.elements.findIndex(val => val === element);
    this.store.dispatch(new SetFocusedSplit(idx));
*/
    this.store.dispatch(new SelectedGridTemplate({templateName: element, button: 'right'}));
  }
}
