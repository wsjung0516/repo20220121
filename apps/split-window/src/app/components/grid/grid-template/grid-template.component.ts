import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component, OnChanges,
  OnInit,
  QueryList, SimpleChanges,
  TemplateRef,
  ViewChildren
} from '@angular/core';
import {GridTemplateDirective} from "../grid-directives/grid-template.directive";
import {Select, Store} from "@ngxs/store";
import {SelectedGridTemplate, SetFocusedSplit, SetSplitAction} from "../../../../state/status/status.actions";
import {CarouselService} from "../../../services/carousel.service";
import {SplitService} from "../../../services/split.service";
import {StatusState} from "../../../../state/status/status.state";
import {Observable} from "rxjs";
import {SelectSnapshot} from "@ngxs-labs/select-snapshot";

@Component({
  selector: 'app-grid-template',
  template: `
    <ng-template [appGridTemplate]="'element1'" let-height=height let-name=selectedTemplate>
      <!-- to get proper template -->
      <div [style.height]="height">
        <div>
          <!--          <button [disabled]="selectedSplit[0]" mat-mini-fab class="fab-bottom-left"-->
<!--          <button [disabled]="onCheckSelectedTemplate('element1', name)" mat-mini-fab class="fab-bottom-left"-->
          <button [disabled]="'element1' !== name" mat-mini-fab class="fab-bottom-left"
                  matTooltip="Can use arrow keys"
                  [matTooltipPosition]="'above'"
                  (click)="onLeftArrowButton('element1')">
            <mat-icon>keyboard_arrow_left</mat-icon>
          </button>
          <button [disabled]="'element1' !== name" mat-mini-fab class="fab-bottom-right"
                  matTooltip="Can use arrow keys"
                  [matTooltipPosition]="'above'"
                  (click)="onRightArrowButton('element1')">
            <mat-icon>keyboard_arrow_right</mat-icon>
          </button>
        </div>
        <app-carousel-main [queryElement]="'element1'">  <!-- to make observable of making split window -->
        </app-carousel-main>
      </div>
    </ng-template>
    <ng-template [appGridTemplate]="'element2'" let-height=height let-name=selectedTemplate>
      <div [style.height]="height">
        <div>
          <button [disabled]="'element2' !== name" mat-mini-fab class="fab-bottom-left"
                  matTooltip="Can use arrow keys"
                  [matTooltipPosition]="'above'"
                  (click)="onLeftArrowButton('element2')">
            <mat-icon>keyboard_arrow_left</mat-icon>
          </button>
          <button [disabled]="'element2' !== name" mat-mini-fab class="fab-bottom-right"
                  matTooltip="Can use arrow keys"
                  [matTooltipPosition]="'above'"
                  (click)="onRightArrowButton('element2')">
            <mat-icon>keyboard_arrow_right</mat-icon>
          </button>
        </div>
        <app-carousel-main [queryElement]="'element2'">
        </app-carousel-main>
      </div>
    </ng-template>
    <ng-template [appGridTemplate]="'element3'" let-height=height let-name=selectedTemplate>
      <div [style.height]="height">
        <div>
          <button [disabled]="'element3' !== name" mat-mini-fab class="fab-bottom-left"
                  matTooltip="Can use arrow keys"
                  [matTooltipPosition]="'above'"
                  (click)="onLeftArrowButton('element3')">
            <mat-icon>keyboard_arrow_left</mat-icon>
          </button>
          <button [disabled]="'element3' !== name" mat-mini-fab class="fab-bottom-right"
                  matTooltip="Can use arrow keys"
                  [matTooltipPosition]="'above'"
                  (click)="onRightArrowButton('element3')">
            <mat-icon>keyboard_arrow_right</mat-icon>
          </button>
        </div>
        <app-carousel-main [queryElement]="'element3'">
        </app-carousel-main>
      </div>
    </ng-template>
    <ng-template [appGridTemplate]="'element4'" let-height=height let-name=selectedTemplate>
      <div [style.height]="height">
        <div>
          <button [disabled]="'element4' !== name" mat-mini-fab class="fab-bottom-left"
                  matTooltip="Can use arrow keys"
                  [matTooltipPosition]="'above'"
                  (click)="onLeftArrowButton('element4')">
            <mat-icon>keyboard_arrow_left</mat-icon>
          </button>
          <button [disabled]="'element4' !== name" mat-mini-fab class="fab-bottom-right"
                  matTooltip="Can use arrow keys"
                  [matTooltipPosition]="'above'"
                  (click)="onRightArrowButton('element4')">
            <mat-icon>keyboard_arrow_right</mat-icon>
          </button>
        </div>
        <app-carousel-main [queryElement]="'element4'">
        </app-carousel-main>
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
   // providers: [Store],
   changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridTemplateComponent {

  @ViewChildren(GridTemplateDirective) templateRef: QueryList<GridTemplateDirective> | undefined;
  @SelectSnapshot(StatusState.getCurrentCategory) currentCategory: string;
  constructor(
    private carouselService: CarouselService,
    private store: Store,
    private splitService: SplitService
  ) {}

  getTemplate( name: string): TemplateRef<any> {
    // @ts-ignore
    return  this.templateRef && this.templateRef.toArray().find( x => x.name === name)!.template;
  }
  onLeftArrowButton(element: string) {
    this.store.dispatch(new SetSplitAction(false));
    const idx = this.splitService.elements.findIndex(val => val === element);
    this.carouselService.getPrevImage(this.currentCategory, element);
    this.store.dispatch(new SetFocusedSplit(idx));
    this.store.dispatch(new SelectedGridTemplate({templateName: element, button: 'left'}));
  }
  onRightArrowButton(element: string) {
    this.store.dispatch(new SetSplitAction(false));
    this.carouselService.getNextImage(this.currentCategory, element);
    const idx = this.splitService.elements.findIndex(val => val === element);
    this.store.dispatch(new SetFocusedSplit(idx));
    this.store.dispatch(new SelectedGridTemplate({templateName: element, button: 'right'}));
  }
}
