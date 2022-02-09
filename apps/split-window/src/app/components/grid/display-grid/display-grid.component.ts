import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output, SimpleChanges
} from "@angular/core";

export interface Tile {
  mcols: number;
  mheight: string;
  mwidth: string;
  cols: number;
  rows: number;
  templateName: string;
}

@Component({
  selector: 'display-grid',
  template: `
    <div>
      <mat-grid-list cols="{{mcols}}" rowHeight="{{mheight}}" >
        <mat-grid-tile
          *ngFor="let tile of tiles"
          [colspan]="tile.cols"
          [rowspan]="tile.rows"
        >
          <div
               [selectColor]="tile.templateName"
               [selectedTemplate]="selectedTemplate"
               (selectTemplate) = "clickSelectTemplate($event)"
                style="width: 100%; height: 100%">
            <display-grid-template [templateName]="tile.templateName"
                                   [templateHeight]="tile.mheight"
                                   [selectedTemplate]="selectedTemplate">
            </display-grid-template>
          </div>
        </mat-grid-tile>
      </mat-grid-list>
    </div>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayGridComponent {
  @Output() selectTpl = new EventEmitter<any>();
  @Input() set splitMode ( val: number) {
    if (val === 1) {
      this.tiles = [...this.tiles1];
    } else if (val === 2) {
      this.tiles = [...this.tiles2];
    } else if( val === 3) {
      this.tiles = [...this.tiles3];
    } else if( val === 4)  {
      this.tiles = [...this.tiles4];
    }
    this.mcols = this.tiles[this.tiles.length - 1].mcols;
    this.mheight = this.tiles[this.tiles.length - 1].mheight;
    // this.store.dispatch(new SetSplitAction(true));
    this.cdr.detectChanges();
  }
  mcols = 1;
  mheight = '82vh';
  tiles1: Tile[] = [
    {mcols: 1, mheight: '82vh', mwidth: '100%', cols: 1, rows: 1, templateName: 'element1'},
  ];
  tiles2: Tile[] = [
    {mcols: 2, mheight: '82vh', mwidth: '50%', cols: 1, rows: 1, templateName: 'element1'},
    {mcols: 2, mheight: '82vh', mwidth: '50%', cols: 1, rows: 1, templateName: 'element2'},
  ];
  tiles3: Tile[] = [
    {mcols: 2, mheight: '82vh', mwidth: '50%', cols: 1, rows: 2, templateName: 'element1'},
    {mcols: 2, mheight: '41vh', mwidth: '50%', cols: 1, rows: 1, templateName: 'element2'},
    {mcols: 2, mheight: '41vh', mwidth: '50%', cols: 1, rows: 1, templateName: 'element3'},
  ];
  tiles4: Tile[] = [
    {mcols: 2, mheight: '41vh', mwidth: '50%', cols: 1, rows: 1, templateName: 'element1'},
    {mcols: 2, mheight: '41vh', mwidth: '50%', cols: 1, rows: 1, templateName: 'element2'},
    {mcols: 2, mheight: '41vh', mwidth: '50%', cols: 1, rows: 1, templateName: 'element3'},
    {mcols: 2, mheight: '41vh', mwidth: '50%', cols: 1, rows: 1, templateName: 'element4'},
  ];
  tiles: Tile[] = [...this.tiles1];

  selectedTemplate: string = this.tiles[0].templateName;

  constructor( private cdr: ChangeDetectorRef) {
  }

  clickSelectTemplate(ev?: any) {
    this.selectedTemplate = ev;
    let idx;
    if( ev === 'element1' ) idx = 0;
    if( ev === 'element2' ) idx = 1;
    if( ev === 'element3' ) idx = 2;
    if( ev === 'element4' ) idx = 3;
    this.selectTpl.emit({element: ev, idx});
    // this.store.dispatch(new SetFocusedSplit(idx));
    // this.store.dispatch(new SetSplitAction(false));
    //
    // this.carouselService.getNextImage(this.currentCategory, this.splitService.selectedElement);
    // this.splitService.selectedElement = ev;

  }
}
