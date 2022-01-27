import {Component, Input, ViewChild} from "@angular/core";
import {GridTemplateComponent} from "../grid-template/grid-template.component";

@Component({
  selector: 'display-grid-template',
  template: `
<!--    <div class="m-1 text-lg text-green-300 bg-gray-200">-->
    <div >
      <ng-container  [ngTemplateOutlet]="onGetTemplate(templateName)"
                     [ngTemplateOutletContext]="{height:templateHeight}"
      ></ng-container>
    </div>
    <app-grid-template #gridTemplate ></app-grid-template>
  `
})
export class DisplayGridTemplateComponent {
  @Input() templateName!: string;
  @Input() templateHeight!: string;
  @ViewChild('gridTemplate', { static: true }) gridTemplate?: GridTemplateComponent;
  constructor() {
  }
  onGetTemplate(name: string) {
    return  this.gridTemplate?.getTemplate(name);
  }
}
