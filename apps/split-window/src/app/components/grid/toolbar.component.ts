import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'grid-toolbar',
  template: `
    <div class="bg-blue-600 flex flex-col justify-center h-16">
      <div class="flex justify-between">
        <div class="flex-start mx-3 mt-3 text-white"><h1>Splitting window for demo. ( by Wonsup Jung ) </h1></div>
        <div class="flex-end mx-3 mt-2">
          <div class="tool-bar">
            <ng-container>
              <grid-menu (selectMode)="onSelectMenu($event)"></grid-menu>
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .tool-bar{
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      /*align-content: stretch;*/
      align-items: flex-start;
      width: 100%;
    }
  `
  ]
})
export class ToolbarComponent implements OnInit {
  @Output() onSelectMode = new EventEmitter<any>();
  constructor() { }

  ngOnInit(): void {
  }
  onSelectMenu(ev: any) {
    console.log(' grid menu', ev);
  }
}
