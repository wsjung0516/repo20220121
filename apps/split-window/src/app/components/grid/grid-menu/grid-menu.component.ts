import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'grid-menu',
  template: `
    <button mat-icon-button [matMenuTriggerFor]="menu3" aria-label="split" id="icon_split"
            class="tools-btn expanded-menu" >
      <img src="{{isAriaExpanded('icon_split')}}" title="Split Window" alt="Split Window"
           class="tools-icon-button">
    </button>
    <mat-menu #menu3="matMenu">
      <button mat-menu-item (click)="onClickWindowSplit(1)">
        <div class="split_menu">
          <!-- <img src="assets/button-icons/menu/iloveimg-resized/block.svg" alt="1" class="window_layout"> -->
          <img src="assets/split_window_icon/icon_one.svg" alt="1" class="window_layout">
          <span class="layout">1</span>
        </div>
      </button>
      <button mat-menu-item (click)="onClickWindowSplit(2)">
        <div class="split_menu">
          <img src="assets/split_window_icon/icon_two.svg" alt="1 X 1" class="window_layout">
          <span class="layout">1 x 1</span>
        </div>
      </button>
      <button mat-menu-item (click)="onClickWindowSplit(3)">
        <div class="split_menu">
          <!-- <img src="assets/button-icons/menu/one_by_two.svg" alt="1 X 2" class="window_layout"> -->
          <img src="assets/split_window_icon/icon_three.svg" alt="1 X 2" class="window_layout">
          <span class="layout">1 x 2</span>
        </div>
      </button>
      <button mat-menu-item (click)="onClickWindowSplit(4)" class="split_menu">
        <div class="split_menu">
          <img src="assets/split_window_icon/icon_four.svg" alt="2 X 2" class="window_layout">
          <span class="layout">2 x 2</span>
        </div>
      </button>
    </mat-menu>
  `,
  styles: [`
    .window_layout{
      width: 24px;
      height: 24px;
      margin-right: 19px;
      display: inline-block;
    }

    .split_menu {
      display: flex;
      flex-direction : row;
      justify-content: flex-start;
      align-items: center;
      margin-right: 5px;
    }

  `]
})
export class GridMenuComponent implements OnInit {
  @Output() selectMode = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  onClickWindowSplit(no: number) {
    this.selectMode.emit({mode: no});
    const element = document.getElementById('icon_split');
    element.setAttribute('aria-expanded','false');
  }
  isAriaExpanded( id: string) {
    const element = document.getElementById(id)
    const x = element?.getAttribute('aria-expanded');
    return x === 'true'?
      `assets/icon_split/${id}_black.svg`
      : `assets/icon_split/${id}_white.svg`;

  }
}
